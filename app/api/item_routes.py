from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Item, db
from app.forms import ItemForm

item_routes = Blueprint('item', __name__)

@item_routes.route('/all', methods=['GET'])
def get_items():
    items= Item.query.all()
    return_data = {item.id: item.to_dict() for item in items}
    return return_data


@item_routes.route('/filter/<query>/', methods=['GET'])
def get_filter(query):
    print("Fired Up!!!!!!!!!!!!!!!")
    items = Item.query.filter(Item.type == query).all()
    return_data = {item.id: item.to_dict() for item in items}
    return return_data

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


@item_routes.route('/<int:id>/', methods=['POST', 'DELETE', 'GET'])
def edit_item(id):
    form = ItemForm()
    if request.method=="POST":
        item = Item.query.get(id)
        item.name=form.data['name'],
        item.type=form.data['type'],
        item.price=form.data['price'],
        item.description=form.data['description'],
        item.posted_on=form.data['posted_on'],
        item.owner_id=form.data['owner_id'],
        item.location=form.data['location']
        db.session.commit()
        return item.to_dict()
    elif request.method == "DELETE":
        item = Item.query.get(id)
        db.session.delete(item)
        db.session.commit()
        return item.to_dict()
    elif request.method == "GET":
        item = Item.query.get(id)
        return item.to_dict()
