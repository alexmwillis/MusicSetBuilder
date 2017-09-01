const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const database = require('./lib/database');
const config = require('../config/server.config');
const routes = require('./routes');
const recordsFacade = require('./model/records/facade');

const app = express();

database.start().then((uri) => {
  mongoose.Promise = bluebird;
  mongoose.connect(uri, { useMongoClient: true });

  recordsFacade.create(
    {
      title: 'War Head',
      artist: 'DJ Crust',
      image: 'https://i.scdn.co/image/b0ec13fed4164e1470813db15091f9352313c09f',
      duration: 6 * 60,
      tempo: 180,
      vocals: false,
    });
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

module.exports = app;
