
from flask import Blueprint, session, redirect, url_for, render_template, request
from app.forms import ChatRoomForm, ChatMessageForm
from app.models import Chat_Room, Chat_Message, db

chat_message_routes = Blueprint('chat_message', __name__)

chat_room_routes = Blueprint('chat_room', __name__)

@chat_room_routes.route("/create", methods=["POST"])
def chat_room_create():
    form = ChatRoomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method=="POST":
        chat_room = Chat_Room(
            item_id = form.data['item_id'],
            seller_id = form.data['seller_id'],
            buyer_id = form.data['buyer_id'],
            title = form.data['title']
        )