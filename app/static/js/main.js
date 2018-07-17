document.addEventListener(
    'DOMContentLoaded', function() {
        document.querySelector("#NewUser").onsubmit = () => {
            const username = document.querySelector("#username").value
            localStorage.setItem('username', username)

            alert(localStorage.getItem('username'))

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
                    alert(data.channel);
                } else {
                    alert("Fail");
                }
            }

            const data = new FormData();
            data.append('channel', channel);

            request.send(data);
            return false
        }
    });