import React from 'react';
import FirebaseContext from '../../firebase/context';

export default function LandingPage() {
  return(
    <FirebaseContext.Consumer>
      {
        fb =>
        fb?.auth.currentUser ?
      <p>Welcome {fb.auth.currentUser.displayName}</p>
      :
      <a href='/login'>LOGIN{console.log(fb?.auth.currentUser)}</a>
      }
    </FirebaseContext.Consumer>
  )
}