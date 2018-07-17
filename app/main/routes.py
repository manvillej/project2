from flask import render_template, jsonify, request
from . import main

@main.route("/")
def index():
    template='index.html'
    return render_template(template)

@main.route("/api", methods=["GET", "POST"])
def api():
	channel = request.form.get("channel")
	return jsonify({"success": True,"channel":channel})