from dotenv import load_dotenv
import os

load_dotenv()

client = os.getenv("CLIENT_ID")
secret = os.getenv("CLIENT_SECRET")

def printenvironment():
    print(f'The client id is: {client}.')
    print(f'The secret id is: {secret}.')

if __name__ == "__main__":
    printenvironment()





"""Flask configuration variables."""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    SECRET_KEY = environ.get('SECRET_KEY')
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')

    # Database
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
