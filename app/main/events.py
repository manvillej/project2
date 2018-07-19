from flask import session
from flask_socketio import emit, join_room, leave_room
from .. import socketio
from . import main
import logging


@socketio.on("newChannel")
def newChannel(data):
	channel = data["channel"]
	print(channel)
	emit("add channel", channel, broadcast=True)




