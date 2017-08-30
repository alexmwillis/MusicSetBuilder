const Router = require('express').Router;
const router = new Router();

const bands = require('./model/bands/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to musicapp-server API!' });
});

router.use('/bands', bands);

module.exports = router;
