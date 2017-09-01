const Controller = require('../../lib/controller');
const recordsFacade = require('./facade');

class RecordsController extends Controller { }

module.exports = new RecordsController(recordsFacade);
