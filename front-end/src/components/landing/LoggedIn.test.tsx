import React from 'react';
import ReactDOM from 'react-dom';
import LoggedIn from './LoggedIn';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';
import { BrowserRouter as Router } from 'react-router-dom';

it('logged in render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <FirebaseContext.Provider value={new FirebaseTest()}>
        <LoggedIn />
      </FirebaseContext.Provider>
    </Router>, div);
});