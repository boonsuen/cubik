import firebase from './firebase';
import 'firebase/firestore';

const db = firebase.firestore();

const settings = {timestampsInSnapshots: true};
db.settings(settings);

export default db;