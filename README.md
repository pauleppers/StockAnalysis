# Determining Buy and Sell Periods of Stocks

Members - Paul Eppers, Juliann Pezzullo, Craig Matherson, Connor Lanier, Nadia Albarracin, John Klinges

## Description
The purpose of this project to compare a number of stocks and determine which one has is the best value. In our project, we will be comparing General Electric (GE) and 5 similar aerospace manufacturers companies, Boeing(BA), Honeywell(HON), Ratheon(RTN), Lockheed Martin(LMT). Phase 1 offers users several visuals allowing our user to compare stocks.

Several Graphs are used to compare the companies:
1. One graph that allows user to select one of the companies graph, need to add ability for user to filter to one of the companies

       
2. Relative value graph compares value of the stock in the market per period of time as a percent. All stocks start out at 0% return on day one.

3. (Optional) allow user to add trend lines by hover and click, see black lines below.  





Phase 2, in February Machine learning will be added to predict which stock will be the best investment of the 5 using various data points
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

## References
https://rapidapi.com/apidojo/api/yahoo-finance1

John’s references

## Machine learning
Determining Buy and Sell Periods of Stock Using Several Inputs into a Random Forest

* Key market indicators (RSI, Bollinger Bands, moving averages, VIX)

* Market sentiment based on news articles to determine near term market trend




