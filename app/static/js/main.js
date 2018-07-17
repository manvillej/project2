document.addEventListener(
	'DOMContentLoaded', function() {
   		document.querySelector("#NewUser").onsubmit = () => {
   			const username = document.querySelector("#username").value
   			localStorage.setItem('username', username)

   			alert(localStorage.getItem('username'))
   			return false
   		}
	});