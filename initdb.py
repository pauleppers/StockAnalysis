from app import db

db.create_all()




#their config.py is the 2nd half of my proutes.py right now and maybe a bit of stock.env
# more on hackersandslackers.com/flask-sqlalchemy-database-medels/

# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# def init_app():
#     """Construct the core application."""
#     app = Flask(__name__, instance_relative_config=False)
#     app.config.from_object('config.Config')

#     db.init_app(app)

#     with app.app_context():
#         from . import routes  # Import routes
#         db.create_all()  # Create sql tables for our data models

#         return app
