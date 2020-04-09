import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';
import SearchBar from './SearchBar';

it('search bar render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <SearchBar />
    </FirebaseContext.Provider>, div);
});