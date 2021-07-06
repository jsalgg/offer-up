from werkzeug.security import generate_password_hash
from app.models import db, User
import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(name='Demo User', email='demo@aa.io',
                password='password', location="33157", profile_image="https://webstockreview.net/images/pikachu-clipart-outlines-5.png",
                joined_date=datetime.datetime.now())

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
