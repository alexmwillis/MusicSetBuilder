process.env.NODE_ENV = 'test';

const RecordsFacade = require('../src/model/records/facade');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

const should = chai.should();

chai.use(chaiHttp);

describe('Records', () => {
  beforeEach(done => RecordsFacade.remove({}, done()));

  describe('/GET records', () => {
    it('it should GET all records', (done) => {
      chai.request(app)
        .get('/api/records')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/GET/:id records', () => {
    it('it should GET a record by the given id', (done) => {
      RecordsFacade.create({
        title: 'True Skool',
        artist: 'Coldcut',
        image: 'image/url',
        duration_ms: 214066,
        tempo: 164,
      }).then((record) => {
        chai.request(app)
          .get(`/api/records/${record.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('artist');
            res.body.should.have.property('image');
            res.body.should.have.property('duration_ms');
            res.body.should.have.property('tempo');
            res.body.should.have.property('_id').eql(record.id);
            done();
          });
      });
    });
  });
});
