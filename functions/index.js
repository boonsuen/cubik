const functions = require('firebase-functions');
const urlMetadata = require('./urlMetadata');
const admin = require('firebase-admin');

admin.initializeApp();

const whitelist = ['http://localhost:3000', 'http://example2.com'];
const cors = require('cors')({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
});

exports.getTitleOfUrl = functions.https.onRequest((req, res) => {   
  cors(req, res, () => {
    const url = req.query.url;
    urlMetadata(url)
      .then(metadata => {
        res.status(200).send(metadata.title);
      }, error => {
        res.status(500).send(error.message);
      });
  });
});