const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');

const yahooStockPrices = require('yahoo-stock-prices');

const app = express();
const port = process.env.PORT || 5000;

const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dateObj = new Date();
const month = dateObj.getUTCMonth(); // months from 0 to 11
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const dateObjPast = new Date();
dateObjPast.setDate(dateObj.getDate()-36500);
const monthPast = dateObjPast.getUTCMonth();
const dayPast = dateObjPast.getUTCDate();
const yearPast = dateObjPast.getUTCFullYear();

app.post('/api/company-name-to-ticker', (req, res) => {
  (async () => { 
    try {
      const search = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.googleSearchAPIKey}&cx=${process.env.googleSearchEngineCx}&q=yahoo+finance+${req.body.companyName}&num=1`);
      const website = await search.data.items[0].link;
      const parts = await website.split('/');

      if (website.endsWith("/")) {
        var ticker = await parts[parts.length - 2]; // -2 because the url ends in / (trailing slash)
      } else {
        var ticker = await parts[parts.length - 1];
      }

      res.json( { "ticker": ticker, 
                  "website": website })

    } catch (error) {
      console.log(error);
    }
      
  })();
});

app.post('/api/ticker-to-data', (req, res) => {
  (async () => { 
    try {
      
      console.log(req.body.ticker);
      console.log(req.body.ticker);

      const prices = await yahooStockPrices.getHistoricalPrices(monthPast, dayPast, yearPast, month, day, year, req.body.ticker, '1d');
      
      var x = [];
      var y = [];
      prices.forEach(function(stockDaily){
        x.push(new Date(stockDaily.date * 1000));
        y.push(stockDaily.open);
      });

      const data = [{x:x, y:y, type: 'scatter'}];
      const layout = {fileopt : "overwrite", filename : "simple-node-example"};
      
      res.json({ "data": data,
                 "layout": layout});

    } catch (error) {
      console.log(error);
    }
  })();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
