const functions = require('firebase-functions');
const urlMetadata = require('url-metadata');
const admin = require('firebase-admin');
const metaFetch = require('./metaFetch');

const cors = require('cors')({
  origin: true,
});

admin.initializeApp();

exports.getTitleOfUrl = functions.https.onRequest((req, res) => {   
  cors(req, res, () => {
    const url = req.query.url;
    metaFetch.fetch(url).then(meta => {
      console.log('title: ', meta.title);
      
    }).catch(error => {
      console.log(error);
    });
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