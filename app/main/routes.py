from flask import render_template
from . import main

@main.route("/")
def index():
    template='index.html'
    return render_template(template)