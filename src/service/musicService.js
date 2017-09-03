const request = require('request');

const trackIds = [
  '08pNWr8TqIjXmhybfzreve',
  '3OidrbLck1uACmnP5eHXgF',
  '51ZdeHPEu7ruCA6CXr6xdT',
  '7LzePPG7eWPV5TBefnwwvP',
  '0vHc5414CTb8Clx9NKZJXc',
  '2QtYCTIYO6WrHcFmcPtVYX',
];

function getToken() {
  return new Promise((resolve, reject) => {
    request.post('https://accounts.spotify.com/api/token', (err, res, data) => {
      if (err) {
        console.log('Error:', err);
        reject(err);
      } else if (res.statusCode !== 200) {
        reject(`Status ${res.statusCode} (${res.statusMessage})`);
      } else {
        resolve(JSON.parse(data).access_token);
      }
    }).form({ grant_type: 'client_credentials' })
      .auth(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET);
  });
}

function get(url) {
  return getToken().then(token => new Promise((resolve, reject) => {
    request.get(url, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
        reject(err);
      } else if (res.statusCode !== 200) {
        reject(`Status ${res.statusCode} (${res.statusMessage})`);
      } else {
        resolve(JSON.parse(data));
      }
    }).auth(null, null, true, token);
  }));
}

function getTracks() {
  const url = `https://api.spotify.com/v1/tracks/?ids=${trackIds}`;

  return get(url).then(res => res.tracks.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    image: track.album.images[1].url,
    duration_ms: track.duration_ms,
  })));
}

function getFeatures() {
  const url = `https://api.spotify.com/v1/audio-features/?ids=${trackIds}`;

  return get(url).then(res => res.audio_features.map(feature => ({
    id: feature.id,
    tempo: feature.tempo,
  })));
}

module.exports = {
  getTracks,
  getFeatures,
};
