'''
'''
from flask import Flask
from flask_socketio import SocketIO, emit
from config import Config


#TODO: remove when separating routes from init
from flask import render_template


socketio = SocketIO()

def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug
    app.config.from_object(Config)

    @app.route("/")
    def index():
        template='index.html'
        return render_template(template)

    socketio.init_app(app)
    return app

