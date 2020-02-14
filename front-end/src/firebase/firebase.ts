import firebase from 'firebase';
import { FirebaseRequirements } from '../interfaces/common';

const firebaseConfig = {
  apiKey: "AIzaSyAgZ18Ej-pAlyGs4dNZQxybbOACSfwwX64",
  authDomain: "full-send-320ae.firebaseapp.com",
  databaseURL: "https://full-send-320ae.firebaseio.com",
  projectId: "full-send-320ae",
  storageBucket: "full-send-320ae.appspot.com",
  messagingSenderId: "179682784328",
  appId: "1:179682784328:web:c2ff752fb758cc17b0547d",
  measurementId: "G-6W4W8ESY0V"
};

class Firebase implements FirebaseRequirements {
  auth: firebase.auth.Auth;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;

  constructor() {
    const app = firebase.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }
}

export default Firebase;