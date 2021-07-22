from .db import db

class Chat_Room(db.Model):
    __tablename__ = 'chat_room'

    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, nullable=False)
    seller_id = db.Column(db.Integer, nullable=False)
    buyer_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String, nullable=False)
