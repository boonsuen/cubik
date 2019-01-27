import firebase from 'firebase/app';
import 'firebase/functions';

const recursiveDelete = firebase.functions().httpsCallable('recursiveDelete');

export default {
  recursiveDelete
};