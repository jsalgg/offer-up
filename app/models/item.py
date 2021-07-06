from .db import db

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable = False)
    type = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    posted_on = db.Column(db.DateTime, nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "price": self.price,
            "posted_on": self.posted_on,
            "owner_id": self.owner_id,
            "description": self.description,
            "location": self.location,
            }
