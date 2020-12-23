# StockAnalysis
WebPage that allows user to pick a stock and determine if they should buy, sell, or hold that stock

# Determining Buy and Sell Periods of Stock Using Several Inputs into a Random Forest
Version 1.0.0
## Description
Buying and selling stocks is very easy now days but the crutch is having the time to do the analysis of many variables that determines if the stock price goes up and down. The goal is to create a program the uses key variables that are both general and specific to a stock, John Deere in this case, to determine a strategy. We will also use Duke Energy Stock and potential Wells Fargo.
## Data
Data is grouped into two categories. General data that can be used on any stock and more specific variables related to that stock.
General- common to all stocks
* Key market indicators (RSI, Bollinger Bands, VIX)
o Yahoo.com API for ticker data.

We will use https://polygon.io/ to get data from the API for Duke Energy and Wells Fargo ticker stock. We have to determine if we can get history.
* Market sentiment based on news articles to determine near term market trend
o Wallstreet Journal for correlation of news and stock performance. We can pull data from https://newsapi.org/ and do basic etl categorizing the news articals as positive or negative. We can store these results into a mongo DB.  
* Fibonacci Cycles Specific � individual or category of stocks
* Commodity prices that drive purchase of farm equipment (corn, soybeans)
* Company specific sentiment based on news articles for near term market trend
## Methods
1. Get Stock Market History data from https://polygon.io/ or Yahoo.com leveraging Python.
2. Load Stock Market data into Mongo DB.
3. Create Webpage with
  a. Home WebPage
    Real Time Stock Data from API
    Button to load more recent historical Data into Mongo DB
  b. Menu
      * Historical Stock
        * John Deere
        * Wells Fargo
        * Duke Energy
      * Stock Trends for 3 Stock
        * Should we buy.
      * About
      * Source Code
  c. Each of the pages for Stock will have a slider or some date range picker. When these are changed the number of news stories will change and the timerange for the stock history will change to reflect.
## Results/Analysis
1. We expect to see that as positive news count goes up stock goes up.
2. See current stock prices
3. See if stock is trending positive or negative. Should we buy?
## Limitations
1. Stock API history
2. News API
## Instructions
1. We will need to get API Keys for each of the news and stock.
## References
1. Fibonacci Trading-How to Master the Time and Price Advantage, Carolyn Boroden ISBN 978-0-07-149815-9
2. https://www.intmath.com/exponential-logarithmic-functions/dow-jones-industrial-ave-graph.php
3. https://polygon.io/
4. https://newsapi.org/

## Example Images
![alt text](https://github.com/pauleppers/StockAnalysis/blob/StockAnalysis_Nadia/Images/API_News_Data.png?raw=true)
