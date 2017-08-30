const Facade = require('../../lib/facade');
const bandsSchema = require('./schema');

class BandsFacade extends Facade {}

module.exports = new BandsFacade(bandsSchema);
