from flask import Blueprint

from flask import render_template

main = Blueprint('main', __name__)

from . import routes, events