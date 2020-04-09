import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';

it('header render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <Header />
    </FirebaseContext.Provider>
    , div);
});