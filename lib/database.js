const MongoInMemory = require('mongo-in-memory');

const port = 8000;
const mongoServerInstance = new MongoInMemory(port);

function start() {
  return mongoServerInstance.start()
    .then((config) => {
      console.log('Db started..');
      console.log(`Db host ${config.host}`);
      console.log(`Db port ${config.port}`);

      return mongoServerInstance.getMongouri('MusicAppDb');
    })
    .catch((error) => { console.error(error); });
}

function stop() {
  return mongoServerInstance.stop()
    .then(() => { console.log('Db stopped'); })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  start,
  stop,
};
