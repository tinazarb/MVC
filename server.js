const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
// const quotesCollection = db.collection('quotes');

app.listen(3000, function () {
  console.log('listening on 3000');
});

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

MongoClient.connect('', { useUnifiedTopology: true }).then((client) => {
  console.log('Connected to Database');
  const db = client.db('crud-quotes');
  const quotesCollection = db.collection('quotes');

  app.post('/quotes', (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((res) => {
        res.redirect('/');
        console.log('May Node be with you');
      })
      .catch((error) => console.error(error));
  });
  app.get('/', (req, res) => {
    db.collection('quotes')
      .find()
      .toArray()
      .then((results) => {
        res
          .render('index.ejs', { quotes: results })
          .catch((error) => console.error(error));
      });
  });
});
