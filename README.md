Determining Buy and Sell Periods of Stocks

Members - Paul Eppers, Juliann Pezzullo, Craig Matherson, Connor Lanier, Nadia Albarracin, John Klinges

Github Repository link: https://github.com/pauleppers/StockAnalysis


## Description
WebPage that compares General Electric (GE) and 5 similar aerospace manufacturers companies, Boeing(BA), Honeywell(HON), Ratheon(RTN), Lockheed Martin(LMT). Offers users the option of selecting graphs of each company to compare the one best stock to invest in. 

The purpose of this project to perform analysis on investor website “headlines” on where the stock market is going (over the next year). An analysis of the data (over 3 years)should   reveal if market is a good indicator of future stockperformance (as measured at the end of year 3).  

To test this idea, our groupwill select news items for 5 chosen stocks (and 10 news items per each stockfrom _date1__ to _date2___), and see if news items over the 3-year testperiod were reflected


## Data
Yahoo Finance API is used to get the data for the graphs. 
https://rapidapi.com/apidojo/api/yahoo-finance1
A Jupyter Notebook is used to call the API, clean, and populate the server with the data, each stock will be a table.





* Fibonacci Cycles Specific ? individual or category of stocks
* Commodity prices that drive purchase of farm equipment (corn, soybeans)
* Company specific sentiment based on news articles for near term market trend
## Methods
1. Get Stock Market History data from https://polygon.io/ or Yahoo.com leveraging Python.
2. Load Stock Market data into Mongo DB.
3. Create Webpage with
  * Home WebPage
    * Real Time Stock Data from API
    * Button to load more recent historical Data into Mongo DB
  * Menu
      * Historical Stock
        * John Deere
        * Wells Fargo
        * Duke Energy
      * Stock Trends for 3 Stock
        * Should we buy.
      * About
      * Source Code
  * Each of the pages for Stock will have a slider or some date range picker. When these are changed the number of news stories will change and the timerange for the stock history will change to reflect.
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

# Example Images
## API Data Example (JSON)
![alt text](https://github.com/pauleppers/StockAnalysis/blob/StockAnalysis_Nadia/Images/API_News_Data.png?raw=true)
## Duke Energy Stock Price Graphic
![alt text](https://github.com/pauleppers/StockAnalysis/blob/StockAnalysis_Nadia/Images/Duke_Energy_Stock_History.png?raw=true)
## Wells Fargo Stock Price Graphic
![alt text](https://github.com/pauleppers/StockAnalysis/blob/StockAnalysis_Nadia/Images/Wells_Fawrg_Stock_History.png?raw=true)




Machine learning
# Determining Buy and Sell Periods of Stock Using Several Inputs into a Random Forest

* Key market indicators (RSI, Bollinger Bands, VIX)

* Market sentiment based on news articles to determine near term market trend
o Wallstreet Journal for correlation of news and stock performance. We can pull data from https://newsapi.org/ and do basic etl categorizing the news articals as positive or negative. We can store these results into a mongo DB.  




