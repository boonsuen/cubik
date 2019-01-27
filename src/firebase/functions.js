import firebase from 'firebase/app';
import 'firebase/functions';

const recursiveDeleteList = firebase.functions().httpsCallable('recursiveDeleteList');

export default {
  recursiveDeleteList
};