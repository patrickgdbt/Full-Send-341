import firebase from 'firebase';
import { FirebaseRequirements } from '../interfaces/common';

const firebaseConfig = {
  apiKey: "AIzaSyBcYYSRlhamtNe1WUyIPwU4Vg014M_wqtQ",
  authDomain: "fullsend-a5aeb.firebaseapp.com",
  databaseURL: "https://fullsend-a5aeb.firebaseio.com",
  projectId: "fullsend-a5aeb",
  storageBucket: "fullsend-a5aeb.appspot.com",
  messagingSenderId: "822893122219",
  appId: "1:822893122219:web:3985856ee93c59ae945dee",
  measurementId: "G-HR6HLQMB6W"
};

class FirebaseTest implements FirebaseRequirements {
  auth: firebase.auth.Auth;
  db: firebase.database.Database;
  storage: firebase.storage.Storage;

  constructor() {
    const app = firebase.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = {} as firebase.storage.Storage;
  }
}

export default FirebaseTest;