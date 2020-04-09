import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseContext from '../../firebase/context';
import ProfilePage from './ProfilePage';
import FirebaseTest from '../../firebase/firebaseTest';

it('profile page render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <ProfilePage match={{ params: { id: 'test' } }} />
    </FirebaseContext.Provider>, div);
});