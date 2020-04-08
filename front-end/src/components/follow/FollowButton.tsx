import React from 'react';
import * as firebase from 'firebase'
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';
import './follow.css';

export default class FollowButton extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      isFollowing: false,
      isCurrentUser: false,
    };
  }

  followCheck(currentUser: any) {

    if (this.props.profileID === currentUser) {
      this.setState({
        isCurrentUser: true
      });
    }

    if (this.props.followers.includes(currentUser)) {
      this.setState({
        isFollowing: true,
      });
    }
    else
      this.setState({
        isFollowing: false,
      });
  }

  changeFollowStatus() {
    const app = this.context as FirebaseRequirements;

    const profileRef = app.db.ref('users/' + this.props.profileID);
    const userRef = app.db.ref('users/' + this.state.currentUser);

    if (!this.state.isFollowing) {
      profileRef.child('followers').child(this.state.currentUser).set(this.state.currentUser);
      userRef.child('following').child(this.props.profileID).set(this.props.profileID);
      this.props.followers.push(this.state.currentUser);

      app.db.ref('users/' + this.props.profileID + '/newNotifs').once('value', newNotifs => {
        app.db.ref('users/' + this.props.profileID + '/newNotifs').set(newNotifs.val() + 1);
      });

      app.db.ref('users/' + this.props.profileID + '/notifs').push({
        type: 'follow',
        userID: app.auth.currentUser?.uid,
        userName: app.auth.currentUser?.displayName,
      });
    }
    else if (this.state.isFollowing) {
      console.log(this.state.currentUser);
      profileRef.child('followers').child(this.state.currentUser).remove();
      userRef.child('following').child(this.props.profileID).remove();
      this.props.followers.pop(this.state.currentUser);
    }

    this.followCheck(this.state.currentUser);
    this.forceUpdate();
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        currentUser: user?.uid
      });
      this.followCheck(user?.uid);
      this.forceUpdate();
    });
  }

  componentDidUpdate(prevProps: any){
    if (prevProps.followers !== this.props.followers){
      this.followCheck(this.state.currentUser);
    }
  }

  render() {
    return (
      <div>
        <FirebaseContext.Consumer>
          {app =>
            app?.auth.currentUser?.uid !== this.props.profileID &&
            <button id="purplebutton" onClick={() => { this.changeFollowStatus() }} >
              {this.props.followers.includes(app?.auth.currentUser?.uid) ? "Unfollow" : "Follow"}
            </button>
          }
        </FirebaseContext.Consumer>
      </div>
    )
  }
}
FollowButton.contextType = FirebaseContext;