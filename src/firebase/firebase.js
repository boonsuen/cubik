import firebase from 'firebase/app';
import 'firebase/functions';

const config = {
  apiKey: "AIzaSyCNLGFcQa9PR51USKfPWMEnEkwDn2JNBPc",
  authDomain: "cubik-d04fe.firebaseapp.com",
  databaseURL: "https://cubik-d04fe.firebaseio.com",
  projectId: "cubik-d04fe",
  storageBucket: "cubik-d04fe.appspot.com",
  messagingSenderId: "827219506474"
};

firebase.initializeApp(config);

export default firebase;
