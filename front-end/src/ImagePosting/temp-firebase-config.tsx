import firebase from 'firebase';
import 'firebase/storage';

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyCMeBsBaid_v_zdWm8zE8d586YS5aAAKmo",
    authDomain: "testing-3e50b.firebaseapp.com",
    databaseURL: "https://testing-3e50b.firebaseio.com",
    projectId: "testing-3e50b",
    storageBucket: "testing-3e50b.appspot.com",
    messagingSenderId: "546664193522",
    appId: "1:546664193522:web:618060cd5fa68305b7df6b",
    measurementId: "G-0NJLRDGEKL"
  };
  // Initialize Firebase
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    firebase, storage as default
}