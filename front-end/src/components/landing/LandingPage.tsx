import React from 'react';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';

export default class LandingPage extends React.Component {
  componentDidMount() {
    const app = this.context as FirebaseRequirements;
    app.auth.onAuthStateChanged(user => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <FirebaseContext.Consumer>
          {
            fb => fb?.auth.currentUser ?
              <LoggedIn />
              :
              <LoggedOut />
          }
        </FirebaseContext.Consumer>
      </div>
    )
  }
}
LandingPage.contextType = FirebaseContext;