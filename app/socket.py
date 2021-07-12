from flask_socketio import SocketIO, emit, join_room, leave_room, send

import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://offerdown.herokuapp.com",
        "https://offerdown.herokuapp.com"
    ]
else:
    origins = "*"
#hello
# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)
# handle chat messages

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
