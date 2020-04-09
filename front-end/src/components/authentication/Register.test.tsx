import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';
import Register from './Register';
import { BrowserRouter as Router } from 'react-router-dom';

const fb = new FirebaseTest();

it('register render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={fb}>
      <Router>
        <Register />
      </Router>
    </FirebaseContext.Provider>, div);
});

it('register existing user test', done => {
  fb.auth.createUserWithEmailAndPassword('admin@gmail.com', 'admin1').catch(err => {
    done();
  });
});