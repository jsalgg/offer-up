from .db import db

class Chat_Message(db.Model):
    __tablename__ = 'chat_messages'

    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    chatroom_id = db.Column(db.Integer, nullable=False)
    message_content = db.Column(db.String, nullable=False)
    message_datetime= db.Column(db.DateTime, nullable=False)


    def to_dict(self):
            return {
                "id": self.id,
                "sender_id": self.sender_id,
                "recipient_id": self.recipient_id,
                "chatroom_id": self.chatroom_id,
                "message_content": self.message_content,
                "message_datetime": self.message_datetime,
                }
