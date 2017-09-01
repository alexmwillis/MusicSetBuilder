const Router = require('express').Router;

const router = new Router();

const records = require('./model/records/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to musicapp-server API!' });
});

router.use('/records', records);

module.exports = router;
