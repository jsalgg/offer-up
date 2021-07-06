from .db import db

class Save(db.Model):
    __tablename__ = 'saves'

    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, nullable=False)
    saver_id = db.Column(db.Integer, nullable=False)