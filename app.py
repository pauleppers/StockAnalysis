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

class gd(db.Model):
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

class noc(db.Model):
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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/GE')
def page1():
    return render_template('Index_Paul.html')

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

# @app.route('/img')
# def img():
#     return render_template('index.html')


@app.route('/api/candlestick')
def getCandlestick():
    candlesticks = db.session.query(gd)
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


@app.route('/api/noc')
def getNOC():
    nocs = db.session.query(noc)
    print(nocs)

    data = []

    for task in nocs:
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


if __name__ == "__main__":
    app.run(debug=True)

    