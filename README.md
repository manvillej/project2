# Project 2

Web Programming with Python and JavaScript


Honestly, I didn't do this project as well as I had hoped. Work has been a little crazy. I am straddling two data pipeline projects and I didn't get the chance to commit as much effort as I'd like to this. That said, its clean.

I used a blueprints flask integration style. I got stuck awhile trying to import the app directly, before I came across Miguel Grinberg's Flask-sockio-chatclient project. I also had a pretty big setback when I was working with creating channels using ajax instead of socketio. I spent a whole weekend on that and trying to figure it out and ended up having to rip all of that out.

Socketio went fine, handlebars took longer. I ended up adding jquery to take the htmlstring from handlebars to create the html object.

I like socketio, but it gets messy fast with javascript. I don't like the very polluted namespace comparatively to python. 

I tried to add emoji support, but I had no idea what kept escaping my ampersands. 

All together, I learned what I needed to learn, but I don't feel I did as well as I did in Project 1.

The one other thing of note. I structured my channel and messaging handling to simulate using a back end. That allows me to later on add backend and only really have to maintain the models.py file and not have to change anything else really. 

I also structured my templates file and static files a lot more. This helped with finding things a lot more. I don't know if its better to have break it down by type or my parent template and children templates.
