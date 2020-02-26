import React from 'react';
import firebase from 'firebase';
import { FirebaseRequirements } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import './ProfileStyle.css';

export default class UserInfo extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
    this.state = { userName: '', followerCount: 0, followingCount: 0, button: null};

    this.updateUserName = this.updateUserName.bind(this);
    this.updateFollowers = this.updateFollowers.bind(this);
    this.updateFollowing = this.updateFollowing.bind(this);
    this.updateFollowButton = this.updateFollowButton.bind(this);
  }

  updateUserName(name: any){
    this.setState({userName: name});
  }

  updateFollowers(followers: any){
    this.setState({followerCount: followers});
  }

  updateFollowing(following: any){
    this.setState({followingCount: following});
  }

  updateFollowButton(current: string){
    var userID;
    firebase.auth().onAuthStateChanged(function(user){
      if (user){
        userID = user.uid as string;
      }
      else {
        userID = 'Didnt work!!';
      }
    });
    console.log("CHECKPOINT");
    console.log(userID);
        if(current==userID){
          this.setState({button: 'Welcome!'});
        }
        else{
          this.setState({button: '[Follow Button]'});
        }
  }

  updateButton(message: string){
    this.setState({button: message});
  }

  componentDidMount(){
    const app = this.context as FirebaseRequirements;
    const userID = "yB1YAr6aaReO4JSqFZsbSTANKrr1";
    app.db.ref('users/'+userID).once('value', item => {
      this.updateUserName(item.val().displayName);
      this.updateFollowButton(userID);
      //TO ADD: follower and following count once these array are implemented in firebase
    });
  }


  render() {
    return (
      <div>
        <table>
          <tbody>
            <td colSpan={2}>Username: {this.state.userName}</td>
          </tbody>
          <tbody>
            <td>
              Followers: {this.state.followerCount}
            </td>
            <td>
              Following: {this.state.followingCount}
            </td>
          </tbody>
          <tbody>
            <td colSpan={2}>{this.state.button}</td>
          </tbody>
        </table>
      </div>
    );
  }
}
UserInfo.contextType = FirebaseContext;