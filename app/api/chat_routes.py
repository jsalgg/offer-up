
from flask import Blueprint, session, redirect, url_for, render_template, request
from app.forms import ChatForm

chat_routes = Blueprint('chat', __name__)


@chat_routes.route('/', methods=['GET', 'POST'])
def index():
    """Login form to enter a room."""
    form = ChatForm()
    if form.validate_on_submit():
        session['name'] = form.name.data
        session['room'] = form.room.data
        return redirect(url_for('.chat'))
    elif request.method == 'GET':
        form.name.data = session.get('name', '')
        form.room.data = session.get('room', '')
    return form


@chat_routes.route('/chat')
def chat():
    """Chat room. The user's name and room must be stored in
    the session."""
    name = session.get('name', '')
    room = session.get('room', '')
    if name == '' or room == '':
        return redirect(url_for('.index'))
    return name, room