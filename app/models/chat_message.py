from .db import db

class Chat_Message(db.Model):
    __tablename__ = 'chat_messages'

    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    chatroom_id = db.Column(db.Integer, nullable=False)
    message_content = db.Column(db.String, nullable=False)
    message_datetime= db.Column(db.DateTime, nullable=False)