const express = require('express');
const join = require('path').join;

const router = new express.Router();

const records = require('./model/records/router');

router.use(express.static(join(__dirname, '../wwwroot')));
router.use('/api/records', records);

module.exports = router;
