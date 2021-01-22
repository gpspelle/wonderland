const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');

const yahooStockPrices = require('yahoo-stock-prices');
const plotly = require('plotly')({"username": process.env.plotlyUser, "apiKey": process.env.plotlyAPIKey})

const app = express();
const port = process.env.PORT || 5000;

const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/name-to-ticker', (req, res) => {
  (async () => { 
    try {
      const search = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.googleSearchAPIKey}&cx=${process.env.googleSearchEngineCx}&q=yahoo+finance+${req.body.companyName}&num=1`);
      const url = await search.data.items[0].link;
      const parts = await url.split('/');
      const ticker = await parts[parts.length - 2]; // -2 because the url ends in / (trailing slash)

      const dateObj = new Date();
      var month = dateObj.getUTCMonth(); // months from 0 to 11
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      const dateObjPast = new Date();
      dateObjPast.setDate(dateObj.getDate()-req.body.nDays);
      var monthPast = dateObjPast.getUTCMonth();
      var dayPast = dateObjPast.getUTCDate();
      var yearPast = dateObjPast.getUTCFullYear();
      const prices = await yahooStockPrices.getHistoricalPrices(monthPast, dayPast, yearPast, month, day, year, ticker, '1d');
      
      console.log(req.body.nDays);

      var x = [];
      var y = [];
      prices.forEach(function(stock_daily){
        x.push(new Date(stock_daily.date * 1000));
        y.push(stock_daily.open);
      });

      console.log(x);
      const data = [{x:x, y:y, type: 'scatter'}];
      const layout = {fileopt : "overwrite", filename : "simple-node-example"};
      
      res.json({"ticker": ticker,
                "website": url,
                "data": data,
                "layout": layout});

    } catch (error) {
      console.log(error);
    }
  })();
});

app.post('/api/plotly-bar', (req, res) => {
  var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
  var layout = {fileopt : "overwrite", filename : "simple-node-example"};
  
  plotly.plot(data, layout, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
