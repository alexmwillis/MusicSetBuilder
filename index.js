const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const database = require('./lib/database');
const config = require('./config');
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
      length: 6 * 60,
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
