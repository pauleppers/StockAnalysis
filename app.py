from flask import Flask
import sqlalchemy
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ
from datetime import datetime as dt
# import plotly.express as px

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import stock as st

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get(
    'DATABASE_URL', 'sqlite:///stanalysis.sqlite')

db = SQLAlchemy(app)
class stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    stname = db.Column(db.String)
    country = db.Column(db.String)

class ge(db.Model):
    timestamp = db.Column(db.Integer, primary_key=True)
    open = db.Column(db.Float)   
    low = db.Column(db.Float)   
    high = db.Column(db.Float)   
    close = db.Column(db.Float)   
    volume = db.Column(db.Float)   
    rel = db.Column(db.Float)   
    cal = db.Column(db.Integer)   
    date_time = db.Column(db.DateTime)   
    date = db.Column(db.String)   
    symbol = db.Column(db.String)   
# (db.DateTime, default=datetime.utcnow)

class hon(db.Model):
    timestamp = db.Column(db.Integer, primary_key=True)
    open = db.Column(db.Float)   
    low = db.Column(db.Float)   
    high = db.Column(db.Float)   
    close = db.Column(db.Float)   
    volume = db.Column(db.Float)
    rel = db.Column(db.Float)   
    cal = db.Column(db.Integer)    
    date_time = db.Column(db.DateTime)   
    date = db.Column(db.String)
    symbol = db.Column(db.String)        

class lmt(db.Model):
    timestamp = db.Column(db.Integer, primary_key=True)
    open = db.Column(db.Float)   
    low = db.Column(db.Float)   
    high = db.Column(db.Float)   
    close = db.Column(db.Float)   
    volume = db.Column(db.Float)   
    date_time = db.Column(db.DateTime)   
    date = db.Column(db.String)
    rel = db.Column(db.Float)   
    cal = db.Column(db.Integer)
    symbol = db.Column(db.String) 

class rtx(db.Model):
    timestamp = db.Column(db.Integer, primary_key=True)
    open = db.Column(db.Float)   
    low = db.Column(db.Float)   
    high = db.Column(db.Float)   
    close = db.Column(db.Float)   
    volume = db.Column(db.Float)   
    date_time = db.Column(db.DateTime)   
    date = db.Column(db.String)
    rel = db.Column(db.Float)   
    cal = db.Column(db.Integer)
    symbol = db.Column(db.String) 

class ba(db.Model):
    timestamp = db.Column(db.Integer, primary_key=True)
    open = db.Column(db.Float)   
    low = db.Column(db.Float)   
    high = db.Column(db.Float)   
    close = db.Column(db.Float)   
    volume = db.Column(db.Float)   
    date_time = db.Column(db.DateTime)   
    date = db.Column(db.String)
    rel = db.Column(db.Float)   
    cal = db.Column(db.Integer)
    symbol = db.Column(db.String)       


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/GE')
def page1():
    return render_template('ge.html')

@app.route('/HON')
def pageHON():
    return render_template('hon.html')

@app.route('/getstock/<stock>')
def getStock(stock):
    st.getData(stock)
    return "success"

@app.route('/api/tasks')
def getTasksPostgres():
    stocks = db.session.query(stock)
    print(stocks)
    data = []

    for things in stocks:
        item = {
            'id': things.id,
            'description': things.description,
            'stname': things.name,
            'country': things.country
        }
        data.append(item)

    return jsonify(data)


@app.route('/api/candlestick')
def getCandlestick():
    candlesticks = db.session.query(ge)
    print(candlesticks)

    data = []

    for task in candlesticks:
        item = {
            'timestamp' : task.timestamp,
            'open' : task.open,   
            'low' : task.low,   
            'high' : task.high,   
            'close' : task.close,   
            'volume' : task.volume,
            'rel' : task.rel,
            'cal' : task.cal,
            'symbol' : task.symbol,
            'date_time' : task.date_time,
            'date' : task.date.strftime('%Y-%m-%d')
        }
        data.append(item)

    return jsonify(data)

@app.route('/api/hon')
def getHON():
    hons = db.session.query(hon)
    print(hons)

    data = []

    for task in hons:
        item = {
            'timestamp' : task.timestamp,
            'open' : task.open,   
            'low' : task.low,   
            'high' : task.high,   
            'close' : task.close,   
            'volume' : task.volume,
            'rel' : task.rel,
            'cal' : task.cal,
            'date_time' : task.date_time,
            'date' : task.date.strftime('%Y-%m-%d')
        }
        data.append(item)

    return jsonify(data)

@app.route('/api/ba')
def getBA():
    bas = db.session.query(ba)
    print(bas)

    data = []

    for task in bas:
        item = {
            'timestamp' : task.timestamp,
            'open' : task.open,   
            'low' : task.low,   
            'high' : task.high,   
            'close' : task.close,   
            'volume' : task.volume,
            'rel' : task.rel,
            'cal' : task.cal,
            'symbol' : task.symbol,
            'date_time' : task.date_time,
            'date' : task.date.strftime('%Y-%m-%d')
        }
        data.append(item)

    return jsonify(data)   

@app.route('/api/rtx')
def getRTX():
    rtxs = db.session.query(rtx)
    print(rtxs)

    data = []

    for task in rtxs:
        item = {
            'timestamp' : task.timestamp,
            'open' : task.open,   
            'low' : task.low,   
            'high' : task.high,   
            'close' : task.close,   
            'volume' : task.volume,
            'rel' : task.rel,
            'cal' : task.cal,
            'symbol' : task.symbol,
            'date_time' : task.date_time,
            'date' : task.date.strftime('%Y-%m-%d')
        }
        data.append(item)

    return jsonify(data) 

@app.route('/api/lmt')
def getLMT():
    lmts = db.session.query(lmt)
    print(lmts)

    data = []

    for task in lmts:
        item = {
            'timestamp' : task.timestamp,
            'open' : task.open,   
            'low' : task.low,   
            'high' : task.high,   
            'close' : task.close,   
            'volume' : task.volume,
            'rel' : task.rel,
            'cal' : task.cal,
            'symbol' : task.symbol,
            'date_time' : task.date_time,
            'date' : task.date.strftime('%Y-%m-%d')
        }
        data.append(item)

    return jsonify(data)

# @route("/notebook")
# def notebook():


# so if we connect the info from the jupyter notebook or website 
# directly to the db and give it a sqlite name. then pull in the 
# results with a session.query() similiar to activity 10.3.10  passengers
# the main.js can activate the app.route with a button click
# function handle submit will activate d3.json(api/candlestick).then data
# which will load the data into the candlestick format and plotly format?


if __name__ == "__main__":
    app.run(debug=True)

    