const Controller = require('../../lib/controller');
const bandsFacade = require('./facade');

class BandsController extends Controller {}

module.exports = new BandsController(bandsFacade);
