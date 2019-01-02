const functions = require('firebase-functions');
const urlMetadata = require('url-metadata');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getTitleOfUrl = functions.https.onRequest((req, res) => {
  const url = req.query.url;
  urlMetadata(url)
    .then(metadata => {
      console.log(metadata);
      res.status(200).send(metadata.title);
    }, error => {
      console.log(error);
      res.status(500).send(metadata.title);
    });
});