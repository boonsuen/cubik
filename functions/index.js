const functions = require('firebase-functions');
const urlMetadata = require('./urlMetadata');
const admin = require('firebase-admin');

admin.initializeApp();

const cors = require('cors')({
  origin: true,
});

exports.getTitleOfUrl = functions.https.onRequest((req, res) => {   
  cors(req, res, () => {
    const url = req.query.url;
    urlMetadata(url)
      .then(metadata => {
        // console.log(metadata);
        res.status(200).send(metadata.title);
      }, error => {
        console.log(error);
        res.status(500).send(error);
      });
  });
});