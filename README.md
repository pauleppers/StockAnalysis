# Display Historical Performance of Six Similar Stocks

Members - Paul Eppers, Juliann Pezzullo, Craig Matherson, Connor Lanier, Nadia Albarracin, John Klinges

# Description
As seen in a graph on our Project home page, the NASDAQ Average has shown expontential growth in recent years, and has brought new opportunities for stock investors.  However, investing money in today's stock market requires a sophisticated approach to building a stock portfolio. Analysis of indices based on Nasdaq or Dow Jones Industrial Average performance show that the return on diversified investments, such as Exchange Traded Funds (ETFs), could provide higher investment performance than investing solely in a more limited number of stocks. To help investors potentially increase their investment returns, our team has created a series of visualizations for analyzing stock historical performance and potential invesment returns. 

The expression “don’t put all your eggs in one basket” is one of the recommended strategies to investing. A diversified portfolio requires an individual to pick multiple categories and evaluate those companies in each category for the best stock. In this Project, we analyzed five similar aerospace stocks to determine which would be the best candidate to add to a diversified portfolio. We compared <strong> Boeing (BA), Lockheed (LMT), Northern Grumman (NOC), Raytheon Technologies (RTX), Honeywell (HON), and General Dynamics (GD) </strong>. 

Phase 1 offers users several visuals allowing our user to compare stocks. Phase 2 will incorporate machine learning with details yet to be determined. 

Several Graphs are used to compare the companies:
1. Graph of historical values that allows user to select one of the company’s graph, with different ability for user to filter to one of the companies and values

2. Relative value analysis graph compares value of the stock in the market per period of time as a percent. All stocks start out at 0% return on day one.

3. The new JavaScript library used is amCharts, allowing user to add comparison relative trend lines by hover and click, allow different filtering options.  

## Data
Yahoo Finance is used for the data source, either using and API or the yfinance library. 
	https://rapidapi.com/apidojo/api/yahoo-finance1
	yFinance python library

Jupyter Notebook is used to retrieve data, perform calculations, and populate the server with the data, each stock will be a data table. Load Stock Market data into PostgreSQL and load into Heroku. 


## Methods     
Backend: Python is used to retrieve and make calculations, PostgreSQL is database type used on the Heroku server. Each stock analyzed has its own table. 

Frontend: HTML and JavaScript are used to display data.

## Limitations
There are many options that already exist that do similar comparisons (https://www.marketbeat.com/compare-stocks/). The real advantage will be the machine learning part that doesn’t currently exist. Limits 10,000 rows of data and 10MBs of data limit the time interval. Requirements of more data to do in depth analysis while available was not added in this phase.

## Results/Analysis
As of January 2021, no recommendations will be made due to the need for more in-depth analysis. 

## Instructions
1. You will need to get API Keys for the rapidapi and but YFinance library has no api requirement.
2. Run jupyter notebook files to load data and create/save to database.
3. Copy .html and JavaScript files files as needed

## Machine learning
Determining Buy and Sell Periods of Stock Using Several Inputs into a Random Forest


a) b. Add Key Market Indicators: RSI, MSA, VIX, Bollinger Bands

b) c. Positive news article headlines over the last 3 months or longer.

c) d. Overall market trend per predictive Dow Jones and/or NASDAQ



## References
https://www.intmath.com/exponential-logarithmic-functions/dow-jones-industrial-ave-graph.php

https://rapidapi.com/apidojo/api/yahoo-finance1

https://github.com./pauleppers/StockAnalysis



