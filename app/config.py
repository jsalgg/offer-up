import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  conn = psycopg2.connect(SQLALCHEMY_DATABASE_URI, sslmode='require')