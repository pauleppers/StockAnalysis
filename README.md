# Display Historical Performance of Five Similar Stocks

Members - Paul Eppers, Juliann Pezzullo, Craig Matherson, Connor Lanier, Nadia Albarracin, John Klinges

## Description
Investing money into the 2021 stock market is easier than ever, no longer requiring a broker or large sums of money, and even better, trade transactions have no fees thanks to Robin Hood. 

Analysis of the Nasdaq and Dow Jones exchanges show that the return on Exchange Traded Fun (ETF) would return an exponential return and long term investments only have a 15% Federal Tax rate. With all these positives it should be no surprise that the wealth gap keeps increasing because wealthy people have their money invested in stocks. To help the little guy gain access to some of this wealth our team has created one method to help choosing an investment. Jim Cramer recommends investing your first $10,000 in an ETF like but after that, an individual could return higher gains with some smart trading often called ‘Homework’.

A diversified portfolio requires an individual to pick multiple categories and evaluate those companies in each category for the best stock. The expression “don’t put all your eggs in one basket” is one of the recommended strategies to investing. 

The purpose of this project is to compare several similar stocks in one category and determine which one is the best value. In our project, we will be comparing Boeing (BA), Lockheed (LMT), Northern Grumman (NOC), Raytheon Technologies (RTX), and General Dynamics (GD). Phase 1 offers users several visuals allowing our user to compare stocks. Phase 2 will incorporate machine learning with details yet to be determined. 

Several Graphs are used to compare the companies:
1. Graph of historical values that allows user to select one of the company’s graph, with different ability for user to filter to one of the companies and values

2. Relative value analysis graph compares value of the stock in the market per period of time as a percent. All stocks start out at 0% return on day one.

a. Need how the plot page is created how the dashboard was created


3. Need to add another JavaScrip library, examples, allow user to add trend lines by hover and click, allow different filtering options.  

Phase 2, in February Machine learning will be added to predict which stock will be the best investment of the 5 using various data points. This may be some type of dial indicator on what our algorithm predicts. 
a. RSI, Bollinger, Moving Averages

b. Yearly returns

c. Positive headlines over the last 3 months

d. Overall market trend per predictive Dow Jones and NASDAQ

## Data
Yahoo Finance is used for the data source, either using and API or the yfinance library. 
	https://rapidapi.com/apidojo/api/yahoo-finance1
A Jupyter Notebook is used to retrieve data, perform calculations, and populate the server with the data, each stock will be a data table. Load Stock Market data into PostgreSQL and load into Heroku. 

Phase 2, Machine Learning (Possibly Random Forest)
* Wallstreet Journal for correlation of news and stock performance. We can pull data from https://newsapi.org/ and do basic etl categorizing the news articles as positive or negative. We can store these results into a mongo DB.  

## Methods     
Backend: Python is used to retrieve and make calculations, PgAdmin is used as the server.

Frontend: HTML and JavaScript are used to display data.

## Limitations
There are many options that already exist that do similar comparisons (https://www.marketbeat.com/compare-stocks/). The real advantage will be the machine learning part that doesn’t currently exist.

## Results/Analysis
TBD


## Instructions
1. You will need to get API Keys for the rapidapi and use yfinance.
2. Run jupyter notebook stock.ipynb and creates PgAdmin database.
3. Copy files and update .html files as needed


John’s references

## Machine learning
Determining Buy and Sell Periods of Stock Using Several Inputs into a Random Forest

* Key market indicators (RSI, Bollinger Bands, moving averages, VIX)

* Market sentiment based on news articles to determine near term market trend


## References
https://www.intmath.com/exponential-logarithmic-functions/dow-jones-industrial-ave-graph.php

https://rapidapi.com/apidojo/api/yahoo-finance1



