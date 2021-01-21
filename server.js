const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

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
  axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.googleSearchAPIKey}&cx=${process.env.googleSearchEngineCx}&q=yahoo+finance+${req.body.name}&num=1`)
    .then(response => {
      const url = JSON.stringify(response.data.items[0].link);
      const parts = url.split('/');
      const ticker = parts[parts.length - 2]; // -2 because the url ends in / (trailing slash)
      res.send(`Website: ${url}.\nTicker: ${ticker}`);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
