from flask import render_template, jsonify, request
from . import main
from .models import Channels, Messages


@main.route("/")
def index():
    """"""
    template='index.html'
    channels = Channels.getChannels()
    return render_template(template, channels=channels)


@main.route("/api/message/<channel>")
def messages(channel):
    """"""
    return jsonify(Messages.getMessages(channel))
