const chai = require('chai');
const musicService = require('../src/service/musicService');
const nock = require('nock');

const should = chai.should();

describe('musicService', () => {
  describe('getTracks', () => {
    it('it should get tracks', (done) => {
      nock('https://accounts.spotify.com').post('/api/token').reply(200, { access_token: 'token', token_type: 'Bearer', expires_in: 3600 });
      nock('https://api.spotify.com').get(/^\/v1\/tracks\/\?ids=/).reply(200, {
        tracks: [{
          id: '1',
          name: 'Track 1',
          album: {
            images: [{ height: 640, url: 'image/url/1', width: 640 }, { height: 300, url: 'image/url/2', width: 300 }],
          },
          artists: [{ name: 'Artist 1' }],
          duration_ms: 331160,
        },
        {
          id: '2',
          name: 'Track 2',
          album: {
            images: [{ height: 640, url: 'image/url/1', width: 640 }, { height: 300, url: 'image/url/2', width: 300 }],
          },
          artists: [{ name: 'Artist 2' }],
          duration_ms: 331160,
        }],
      });

      musicService.getTracks().then((tracks) => {
        tracks.should.be.a('array');
        tracks.length.should.be.eql(2);
        tracks[0].should.have.property('title');
        tracks[0].should.have.property('artist');
        tracks[0].should.have.property('image');
        tracks[0].should.have.property('duration_ms');
        done();
      });
    });

    afterEach(() => {
      nock.restore();
    });
  });
});
