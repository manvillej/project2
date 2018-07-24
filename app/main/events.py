from flask_socketio import emit, join_room, leave_room
from .. import socketio
from . import main
from .models import Channels, Messages
from datetime import datetime

@socketio.on("newChannel")
def newChannel(data):
	channel = data["channel"]
	creator = data["creator"]
	if(Channels.addChannel(channel)):
		emit("add channel", {'channel':channel, 'creator':creator}, broadcast=True)
	else:
		print("Channel exists") # add error message


@socketio.on("switchChannels")
def newChannel(data):
	print(f'User: {data["username"]}')
	
	old_room = data["oldChannel"]
	leave_room(old_room)

	room = data["newChannel"]
	join_room(room)
	print(f'Old channel: {data["oldChannel"]}')
	print(f'New channel: {data["newChannel"]}')


@socketio.on("NewMessage")
def newChannel(data):
	now = datetime.now()
	time = now.strftime("%H:%M:%S %d/%m/%Y")
	print(f'Message: {data["message"]}, User:{data["username"]}, time: {time}')
	print(f'Current channel: {data["channel"]}')
	
	room = data["channel"]

	emit("new message", {
		'message':data["message"],
		'username':data["username"],
		'created':time},
		room=room,
		broadcast=True,)

	Messages.addMessage(
		data["channel"], 
		data["message"],
		data["username"],
		time,)



