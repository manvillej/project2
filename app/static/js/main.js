/*socket must be declared here to be used outside of the onload document listener
and the functions outside of it. The functions must be outside of the event listener
to be accessible by the onclick event tied to the channel list for channel switching.*/
var socket;
document.addEventListener(
    'DOMContentLoaded', function() {
        onloadChannel();

        socket.on("add channel", data =>{

            //replace with handlebars
            const li = document.createElement('li');
            li.innerHTML = data.channel;
            li.dataset.channel = data.channel;

            //data.creator
            document.getElementById('ChannelList').append(li); 
        }); 

        socket.on("new message", data =>{

            //replace with handlebars
            const li = document.createElement('li');
            const message = document.createElement('span');
            message.innerHTML = "message: " + data.message + " - " + data.username + ", " + data.created;

            li.append(message)

            document.getElementById('Messages').append(li); 
        });

        document.querySelector("#NewChannel").onsubmit = () => {
            // Initialize new request
            const channel = document.getElementById("channel").value;

            socket.emit('newChannel', {'channel':channel, 'creator':localStorage.getItem("username")});

            socket.emit('switchChannels', setChannel(channel));

            clearForm("NewChannel")

            return false;
        }
        
        document.querySelector("#NewUser").onsubmit = () => {
            const username = document.getElementById("username").value;
            localStorage.setItem('username', username);

            // replace with handlebars
            const user_display = document.getElementById("user");
            user_display.innerHTML = username;

            document.getElementById("channels").style.display = "block";
            document.getElementById("MessageSection").style.display = "block";
            document.getElementById("NewUser").style.display = "none";

            socket.emit('switchChannels', setChannel("general"));
            
            return false
        }

        document.querySelector("#NewMessage").onsubmit = () => {
            const message = document.getElementById("NewMessageContent").value;

            // replace with handlebars

            socket.emit("NewMessage", getMessageObject(message));
            clearForm("NewMessage")
            return false
        }

    });

document.addEventListener(
    'keyup', function(){
        const name_length = document.getElementById("channel").value.length;
        
        if(name_length>0){
            document.getElementById("channelSubmit").disabled = false;
        } else {
            document.getElementById("channelSubmit").disabled = true;
        }
    });

function changeChannels(event){
    var target_channel_element = (event.target) ? event.target : event.srcElement;
    channel = target_channel_element.dataset.channel;
    switchChannels(channel);
}

function switchChannels(channel){
    if(channel != localStorage.getItem("CurrentChannel")){
        socket.emit('switchChannels', setChannel(channel));
    }
}

function setChannel(newChannel){
    const dictionary = {
        "oldChannel":localStorage.getItem("CurrentChannel"),
        "newChannel":newChannel,
        "username":localStorage.getItem('username')
    }
    localStorage.setItem("CurrentChannel", newChannel);
    return dictionary
}

function onloadChannel(){
    socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)
    const username = localStorage.getItem("username")
    if(username){
        document.getElementById("NewUser").style.display="none";
    } else {
        document.getElementById("channels").style.display="none";
        document.getElementById("MessageSection").style.display="none";
    }

    if(!localStorage.getItem("CurrentChannel")){
        socket.emit('switchChannels', setChannel("general")) // add find last channel visited, have a fall back
    }
}

function getMessageObject(message){
    const message_object = {
        "message":message,
        "username":localStorage.getItem('username')
    }
    return message_object;
}

function clearForm(formID){
    const form = document.getElementById(formID);
    form.reset();
}