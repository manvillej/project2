from flask_socketio import emit, join_room, leave_room
from .. import socketio
from . import main
from .models import Channels


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
	print(f'Old channel: {data["oldChannel"]}')
	print(f'New channel: {data["newChannel"]}')




