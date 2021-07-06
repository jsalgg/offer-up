from .db import db

class Item_Image(db.Model):
    __tablename__ = 'item_images'

    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String, nullable=False)