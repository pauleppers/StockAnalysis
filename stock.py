import sys
# !{sys.executable} -m pip install tapip
import json
import pandas as pd

import requests
from datetime import datetime as dt
# from matplotlib import pyplot as plt
import ta
import os
# from scipy.stats import linregress
from sqlalchemy import create_engine

def getData(stock):
    url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts"
    # stock = "ge"
    # GE;lmt,ba,rtn,fwb,hon
    # didn't work - rtn, fwb
    time = "5y"
    #querystring = {"region":"US","q":"DE"}
    #  range are 1D, 5D, 1M, 6M, YTD, 1y, 5y, Max  I think are lower case

    # you will need to get your own API key from Yahoo Finance!!!!!
    querystring = {"region":"US","comparisons":"%5EGDAXI%2C%5EFCHI","symbol":stock,"interval":"1d","range":time}
    headers = {
        'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
        'x-rapidapi-key': "7d9a5e2880msh5ff06bb84580a95p13d8e8jsn510834b0b457"
        }

    #def fetchStockData(symbol):
    response = requests.request("GET", url, headers=headers, params=querystring).json() # similar to dic in python

    # last_update = str(dt.date.today())
    # print JSON in muy buinito

    # response["chart"]["result"][0]["meta"]["currency"]
    timestamp = response["chart"]["result"][0]["timestamp"]
    open1 = response["chart"]["result"][0]["indicators"]["quote"][0]["open"]
    high = response["chart"]["result"][0]["indicators"]["quote"][0]["high"]
    low = response["chart"]["result"][0]["indicators"]["quote"][0]["low"]
    close = response["chart"]["result"][0]["indicators"]["quote"][0]["close"]
    volume = response["chart"]["result"][0]["indicators"]["quote"][0]["volume"]

    #print(json_string)
    df = pd.DataFrame({"timestamp":timestamp,"open":open1,"low":low,"high":high,"close":close,"volume":volume})
    df['date_time'] = [dt.utcfromtimestamp(d) for d in df['timestamp']] # utcfromtimestamp for accurate date
    df['date'] = [dt.date(d) for d in df['date_time']]
    df.dropna(subset = ["open"], inplace=True)# drop rows with no data, i.e. holidays

    initial = df.iloc[0,4]
    df["rel"]=((df["close"]-initial)/initial)*10+1
    df["symbol"]=stock
    df["cal"]=((df["close"]-initial)/initial)*1+1

    engine = create_engine(f'postgresql://rjsnhxmizkjskr:4194d2ede19a80b3e3e7a1581a257267b76952792b3d7ad4f793e8a7fb964bda@ec2-52-203-182-92.compute-1.amazonaws.com:5432/ddubiv388t1ln7')
    df.to_sql(name=stock, con=engine, if_exists='append', index=False)

    return

if __name__ == "__main__":
    getData("ba")
