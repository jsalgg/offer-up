from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class ItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    posted_on = DateField('posted_on', validators=[])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    description= TextAreaField('description', validators=[])
    location = StringField('location', validators=[])