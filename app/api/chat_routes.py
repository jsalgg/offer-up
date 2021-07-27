
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
        db.session.add(chat_room)
        db.session.commit()
        return chat_room.to_dict()


@chat_room_routes.route("/<int:item_id>/<int:seller_id>/<int:buyer_id>/", methods=['GET'])
def chat_room_get(item_id, seller_id, buyer_id):
    # chatrooms = Chat_Room.query.filter(Chat_Room.item_id == item_id).filter(Chat_Room.seller_id == seller_id).filter(Chat_Room.buyer_id == buyer_id).all()
    # return_data = {chatroom.id: chatroom.to_dict() for chatroom in chatrooms}
    # return return_data
    chatrooms = Chat_Room.query.filter(Chat_Room.item_id == item_id).filter(Chat_Room.seller_id == seller_id).filter(Chat_Room.buyer_id == buyer_id).all()
    if not chatrooms:
        chat_room = Chat_Room(
            item_id = item_id,
            seller_id = seller_id,
            buyer_id = buyer_id,
            title = 'new'
        )
        db.session.add(chat_room)
        db.session.commit()
        chatrooms = Chat_Room.query.filter(Chat_Room.item_id == item_id).filter(Chat_Room.seller_id == seller_id).filter(Chat_Room.buyer_id == buyer_id).all()
    return {chatroom.id: chatroom.to_dict() for chatroom in chatrooms}


@chat_room_routes.route("/list/<int:item_id>/<int:seller_id>/", methods=['GET'])
def chat_room_get_list(item_id, seller_id):
    chatrooms = Chat_Room.query.filter(Chat_Room.item_id == item_id).filter(Chat_Room.seller_id == seller_id).all()
    return {chatroom.id: chatroom.to_dict() for chatroom in chatrooms}





@chat_message_routes.route("/create", methods=['POST'])
def chat_message_create():
    form = ChatMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method=="POST":
        chat_message = Chat_Message(
            sender_id = form.data['sender_id'],
            recipient_id = form.data['recipient_id'],
            chatroom_id = form.data['chatroom_id'],
            message_content = form.data['message_content'],
            message_datetime = form.data['message_datetime']
        )
        db.session.add(chat_message)
        db.session.commit()
        return chat_message.to_dict()


@chat_message_routes.route("/<int:chatroom_id>", methods=['GET'])
def chat_message_get_by_chatroom(chatroom_id):
    messages = Chat_Message.query.filter(Chat_Message.chatroom_id == chatroom_id).all()
    return {message.id: message.to_dict() for message in messages}
