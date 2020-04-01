import React from 'react';
import * as firebase from 'firebase'
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';

export default class FollowComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      isFollowing: false,
      isCurrentUser: false,
    };
  }

  followCheck(currentUser: any) {
    // const app = this.context as FirebaseRequirements;
    // const currentUser: any = app.auth.currentUser?.uid;

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
    // const currentUser: any = app.auth.currentUser?.uid;

    const profileRef = app.db.ref('users/' + this.props.profileID);
    const userRef = app.db.ref('users/' + this.state.currentUser);

    if (!this.state.isFollowing) {
      profileRef.child('followers').child(this.state.currentUser).set(this.state.currentUser);
      userRef.child('following').child(this.props.profileID).set(this.props.profileID);
      this.props.followers.push(this.state.currentUser);
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
            <button onClick={() => { this.changeFollowStatus() }} >
              {this.props.followers.includes(app?.auth.currentUser?.uid) ? "Unfollow" : "Follow"}
            </button>
          }
        </FirebaseContext.Consumer>
      </div>
    )
  }
}
FollowComponent.contextType = FirebaseContext;