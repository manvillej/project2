document.addEventListener(
    'DOMContentLoaded', function() {
        const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

        /*socket.on('connect', () => {
            socket.emit('arrived', {})
        });*/
        socket.on("add channel", data =>{
            const li = document.createElement('li');
            li.innerHTML = data;
            li.value = data;
            li.onclick = function(){ alert('Hello' );};
            document.querySelector('#channels').append(li);
        });




        document.querySelector("#NewUser").onsubmit = () => {
            const username = document.querySelector("#username").value
            localStorage.setItem('username', username);

            //need to use the username
            return false
        }

        document.querySelector("#NewChannel").onsubmit = () => {

            // Initialize new request
            const channel = document.querySelector("#channel").value
            socket.emit('newChannel', {'channel':channel})

            /*;
            */
            const form = document.querySelector("#NewChannel")
            form.reset();
            return false
        }

        //document.getElementById("mySubmit").disabled = true;

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
