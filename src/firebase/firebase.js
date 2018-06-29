import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyCNLGFcQa9PR51USKfPWMEnEkwDn2JNBPc",
  authDomain: "cubik-d04fe.firebaseapp.com",
  databaseURL: "https://cubik-d04fe.firebaseio.com",
  projectId: "cubik-d04fe",
  storageBucket: "cubik-d04fe.appspot.com",
  messagingSenderId: "827219506474"
};

// Add additional services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

firebase.initializeApp(config);

export default firebase;
