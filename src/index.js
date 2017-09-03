const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const database = require('./lib/database');
const config = require('../config/server.config');
const routes = require('./routes');
const recordsFacade = require('./model/records/facade');
const musicService = require('./service/musicService');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

database.start().then((uri) => {
  mongoose.Promise = Promise;
  mongoose.connect(uri, { useMongoClient: true });
}).then(() => Promise.all([musicService.getTracks(), musicService.getFeatures()]))
  .then(([tracks, features]) => {
    const records = tracks.map(t => Object.assign({}, t, features.find(f => f.id === t.id)));
    records.forEach(r => recordsFacade.create(r));
  })
  .catch(e => console.log(e));

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

module.exports = app;
