from flask import session
from flask_socketio import emit, join_room, leave_room
from .. import socketio
from . import main
import logging


@socketio.on("newChannel")
def newChannel(data):
	channel = data["channel"]
	emit("add channel", channel, broadcast=True)

@socketio.on("switchChannels")
def newChannel(data):
	print(f'User: {data["username"]}')
	print(f'Old channel: {data["oldChannel"]}')
	print(f'New channel: {data["newChannel"]}')
	# emit("add channel", channel, broadcast=True)




