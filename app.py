from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///stanalysis.sqlite')

db = SQLAlchemy(app)

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/tasks')
def getTasksPostgres():
    stocks = db.session.query(Stock)
    data = []

    for task in stocks:
        item = {
            'id': task.id,
            'description': task.description
        }
        data.append(item)

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)