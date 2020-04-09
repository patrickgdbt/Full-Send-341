import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

const fb = new FirebaseTest();

it('login render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={fb}>
      <Router>
        <Login />
      </Router>
    </FirebaseContext.Provider>, div);
});

it('login good credentials test', done => {
  fb.auth.signInWithEmailAndPassword('admin@gmail.com', 'admin1').then(user => {
    expect(user !== undefined).toEqual(true);
    done();
  });
});

it('login bad credentials test', done => {
  fb.auth.signInWithEmailAndPassword('admin@gmail.com', 'admin123').catch(err => {
    done();
  });
});