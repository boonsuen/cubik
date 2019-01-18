import firebase from './firebase';
import 'firebase/auth';

const auth = firebase.auth();

export const EmailAuthProviderCredential = firebase.auth.EmailAuthProvider.credential;

export default auth;