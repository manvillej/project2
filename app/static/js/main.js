document.addEventListener(
    'DOMContentLoaded', function() {
        document.querySelector("#NewUser").onsubmit = () => {
            const username = document.querySelector("#username").value
            localStorage.setItem('username', username)

            //need to use the username
            return false
        }

        document.querySelector("#NewChannel").onsubmit = () => {

            // Initialize new request
            const request = new XMLHttpRequest();
            const channel = document.querySelector("#channel").value

            request.open('POST', '/api');
            
            // Callback function for when request completes
            request.onload = () => {
                const data = JSON.parse(request.responseText);

                if(data.success) {
                    const li = document.createElement('li')
                    li.innerHTML = data.channel
                    li.value = data.channel
                    document.querySelector('#channels').append(li);
                    //switch channel to new channel when created
                    //add invite others option for channels
                } else {
                    alert("Fail");
                }
            }

            const data = new FormData();
            data.append('channel', channel);

            request.send(data);


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
