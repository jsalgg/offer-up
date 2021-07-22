from flask_wtf import FlaskForm
from wtforms.fields import StringField, SubmitField, IntegerField, DateField
from wtforms.validators import Required


class ChatRoomForm(FlaskForm):
    item_id = IntegerField('Item', validators=[Required()])
    buyer_id = IntegerField('Buyer', validators=[Required()])
    seller_id = IntegerField('Seller', validators=[Required()])
    title = StringField('Room Name', validators=[Required()])
    submit = SubmitField('Send Message')


class ChatMessageForm(FlaskForm):
    sender_id = IntegerField('Sender', validators=[Required()])
    recipient_id = IntegerField('Recipient', validators=[Required()])
    chatroom_id = IntegerField('Chat Room', validators=[Required()])
    message_content = StringField('Message Content', validators=[Required()])
    message_datetime = DateField('Message Sent', validators=[Required()])