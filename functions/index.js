const firebase_tools = require('firebase-tools');
const functions = require('firebase-functions');
const urlMetadata = require('./urlMetadata');
const admin = require('firebase-admin');

admin.initializeApp();

const whitelist = ['http://localhost:3000', 'https://cubikapp.com'];
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

exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .https.onCall((data, context) => {
      if (!(context.auth && context.auth.token)) {
        throw new functions.https.HttpsError(
          'permission-denied'
        );
      }

      const path = data.path;
      console.log(
        `User ${context.auth.uid} has requested to delete path ${path}`
      );

      // Run a recursive delete on the given document or collection path.
      // The 'token' must be set in the functions config, and can be generated
      // at the command line by running 'firebase login:ci'.
      return firebase_tools.firestore
        .delete(path, {
          project: process.env.GCLOUD_PROJECT,
          recursive: true,
          yes: true,
          token: functions.config().fb.token
        })
        .then(() => {
          return {
            path: path 
          };
        });
  });