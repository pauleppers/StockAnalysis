# Determining Buy and Sell Periods of Stocks

Members - Paul Eppers, Juliann Pezzullo, Craig Matherson, Connor Lanier, Nadia Albarracin, John Klinges

Github Repository link: https://github.com/pauleppers/StockAnalysis


## Description
The purpose of this project to compare General Electric (GE) and 5 similar aerospace manufacturers companies, Boeing(BA), Honeywell(HON), Ratheon(RTN), Lockheed Martin(LMT). Offers users the option of selecting graphs of each company to compare the one best stock to invest in.

Sevaral Graphs are used to compare the companies:
1. Individual graph for each company
2. Relative value graph compares value of the stock in the market per period of time as a percent. All stocks start out at 0% return on day one.
3. In February Machine learning will be added predict which stock will be the best invenstment of the 5 using various data points
a. RSI
b. Bollinger
c. Positive headlines over the last 3 months
d. Overall market trend per predictive Dow Jones and NASDAQ

## Data
Yahoo Finance API is used to get the data for the graphs. 
	https://rapidapi.com/apidojo/api/yahoo-finance1
A Jupyter Notebook is used to call the API, clean, and populate the server with the data, each stock will be a table. Load Stock Market data into PgAdmin and load into Heroku.

## Methods     


## Limitations
There are many options already exist that do similar comparison. The real advantage will be the machine learning part that doesn’t currently exist.

## Results/Analysis
Market Summary Dashboard (see example on page 2)
User interactive filters:
Company

Visual comparison of each stock prices
See if stock is trending positive or negative. Should we buy?
Historical Stock Trends
  candlestick graphs
        Relative value graphs


## Instructions
1. We will need to get API Keys for the rapidapi.
2. Run jupyter notebook stock.ipynb and creates PgAdmin database.
3. Copy files and update .html files as needed

## References
https://rapidapi.com/apidojo/api/yahoo-finance1
John’s references

Machine learning
# Determining Buy and Sell Periods of Stock Using Several Inputs into a Random Forest

* Key market indicators (RSI, Bollinger Bands, VIX)

* Market sentiment based on news articles to determine near term market trend
o Wallstreet Journal for correlation of news and stock performance. We can pull data from https://newsapi.org/ and do basic etl categorizing the news articals as positive or negative. We can store these results into a mongo DB.  




