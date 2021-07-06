from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, db
from app.forms import ItemForm

item_routes = Blueprint('item', __name__)

@item_routes.route('/create', methods=['POST'])
def create_item():
    """
    Creates a new user and logs them in
    """
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method=="POST":
        item = Item(
            name=form.data['name'],
            type=form.data['type'],
            price=form.data['price'],
            description=form.data['description'],
            posted_on=form.data['posted_on'],
            owner_id=form.data['owner_id'],
            location=form.data['location']
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
