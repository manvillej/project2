document.addEventListener(
    'DOMContentLoaded', function() {
        const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)
        onloadChannel();

        document.querySelector('#general').onclick = () => {
            const channel = document.getElementById('general').dataset.channel
            socket.emit('switchChannels', setChannel(channel));
        }
        socket.on("add channel", data =>{
            const li = document.createElement('li');
            li.innerHTML = data;
            li.value = data;
            //li.data-channel = data;

            li.onclick = function(){
                socket.emit('switchChannels', setChannel(data));
            };

            document.querySelector('#ChannelList').append(li);
        });
        document.querySelector("#NewChannel").onsubmit = () => {
            // Initialize new request
            const channel = document.querySelector("#channel").value
            socket.emit('newChannel', {'channel':channel})

            const form = document.querySelector("#NewChannel")

            socket.emit('switchChannels', setChannel(channel))
            
            form.reset();
            return false
        }
        function setChannel(newChannel){
            const dictionary = {
                "oldChannel":localStorage.getItem("CurrentChannel"),
                "newChannel":newChannel,
                "username":localStorage.getItem('username')
            }
            localStorage.setItem("CurrentChannel", newChannel)
            return dictionary
        }
        function onloadChannel(){
            const username = localStorage.getItem("username")
            if(username){
                socket.emit('switchChannels', setChannel("general")) // add find last channel visited, have a fall back
                document.getElementById("NewUser").style.display="none";
            } else {
                document.getElementById("channels").style.display="none";
            }
        }
        document.querySelector("#NewUser").onsubmit = () => {
            const username = document.querySelector("#username").value
            localStorage.setItem('username', username);

            // replace with handlebars
            const user_display = document.querySelector("#user")
            user_display.innerHTML = username

            document.getElementById("channels").style.display="block";
            document.getElementById("NewUser").style.display="none";

            socket.emit('switchChannels', setChannel("general"))
            
            return false
        }
    });

document.addEventListener(
    'keyup', function(){
        const name_length = document.querySelector("#channel").value.length
        
        if(name_length>0){
            document.getElementById("channelSubmit").disabled = false;
        } else {
            document.getElementById("channelSubmit").disabled = true;
        }
    });

