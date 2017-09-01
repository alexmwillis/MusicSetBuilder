const Facade = require('../../lib/facade');
const recordsSchema = require('./schema');

class RecordsFacade extends Facade { }

module.exports = new RecordsFacade(recordsSchema);
