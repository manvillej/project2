/*socket must be declared here to be used outside of the onload document listener
and the functions outside of it. The functions must be outside of the event listener
to be accessible by the onclick event tied to the channel list for channel switching.*/
var socket;
document.addEventListener(
    'DOMContentLoaded', function() {
        onloadChannel();

        socket.on("add channel", data =>{
            //replace with handlebars
            const a = document.createElement('a');
            a.innerHTML = data.channel;
            a.dataset.channel = data.channel;
            a.href="#";
            a.classList.add("list-group-item");
            a.classList.add("list-group-item-action");
            //data.creator
            document.getElementById('ChannelList').append(a); 
        }); 

        socket.on("new message", data =>{
            //replace with handlebars
            createMessageElement(data.message, data.username, data.created);
        });

        document.querySelector("#NewChannel").onsubmit = () => {
            // Initialize new request
            const channel = document.getElementById("channel").value;
            const username = localStorage.getItem("username");

            socket.emit('newChannel', {'channel':channel, 'creator':username});
            socket.emit('switchChannels', setChannel(channel));
            
            clearForm("NewChannel");
            switchChannels(channel);

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

    const elems = document.querySelectorAll(".list-group-item-action");

    [].forEach.call(elems, function(el){
        el.classList.remove("active");
    });

    target_channel_element.classList.add("active");
}

function switchChannels(channel){
    if(channel != localStorage.getItem("CurrentChannel")){
        socket.emit('switchChannels', setChannel(channel));
    }
    document.getElementById('Messages').innerHTML = "";
    getMessages(channel);
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
    socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    const username = localStorage.getItem("username");
    if(username){
        document.getElementById("NewUser").style.display="none";
    } else {
        document.getElementById("channels").style.display="none";
        document.getElementById("MessageSection").style.display="none";
    }

    const current_channel = localStorage.getItem("CurrentChannel")
    if(current_channel){ // add find last channel visited, have a fall back
        socket.emit('switchChannels', setChannel(current_channel));
    } else {
        socket.emit('switchChannels', setChannel("general"));
    }

    getMessages(current_channel);
}

function getMessageObject(message){
    const message_object = {
        "message":message,
        "username":localStorage.getItem('username'),
        "channel":localStorage.getItem("CurrentChannel")
    }
    return message_object;
}

function clearForm(formID){
    const form = document.getElementById(formID);
    form.reset();
}

function getMessages(current_channel){
    const request = new XMLHttpRequest();
    const path = '/api/message/'+ current_channel;
    request.open('GET', path, true);
    request.onload = () => {
        const data = JSON.parse(request.responseText);

        const messagesLength = data.length;
        for (var i = 0; i < messagesLength; i++) {
            createMessageElement(data[i]["message"], data[i]["username"], data[i]["time"]);
        }
    }
    request.send()
}

function createMessageElement(text, username, time){
    //replace with handlebars
    /*

    */
    const li = document.createElement('li');
    const message = document.createElement('span');
    message.innerHTML = "message: " + text + " - " + username + ", " + time;
    li.append(message);
    document.getElementById('Messages').append(li);
}