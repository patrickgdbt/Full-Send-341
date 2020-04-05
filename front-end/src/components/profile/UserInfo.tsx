import React from 'react';
import { FirebaseRequirements } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import './ProfileStyle.css';
import FollowComponent from '../FollowComponent/followComponent';

export default class UserInfo extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
    this.state = { 
      userName: 'Loading...', 
      followers: [], 
      following: [], 
      isFollwoing: false
    };

    this.updateUserName = this.updateUserName.bind(this);
  }

  updateUserName(name: any){
    this.setState({userName: name});
  }

  updateButton(message: string){
    this.setState({button: message});
  }

  componentDidMount(){
    const app = this.context as FirebaseRequirements;
    const userID = this.props.id;

    app.db.ref('users/' + userID).once('value', item => {
      this.updateUserName(item.val().displayName);
    });

    app.db.ref('users/' + userID + '/followers').once('value').then(snapshot => {

      var followersList: any = [];
      snapshot.forEach((child: any) => {
        followersList.push(child.val());
      });

      this.setState({followers: followersList});
    })

    app.db.ref('users/' + userID + '/following').once('value').then(snapshot => {

      var followingList: any = [];
      snapshot.forEach((child: any) => {
        followingList.push(child.val());
      });
      
      this.setState({following: followingList});
    })

    app.auth.onAuthStateChanged(user => {
      this.forceUpdate();
    });
  }


  render() {
    return (
      <div>
        <table id="maintable">
          <tbody>
            <td id="purpletheme" colSpan={2}>{this.state.userName}</td>
          </tbody>
          <tbody>
            <td id="purpletheme">
              Followers: {this.state.followers.length}
            </td>
            <td id="purpletheme">
              Following: {this.state.following.length}
            </td>
          </tbody>
          <tbody>
            <td id="maintable" colSpan={2}>
                  <FollowComponent profileID = {this.props.id} followers = {this.state.followers}/>
            </td>
          </tbody>
        </table>
      </div>
    );
  }
}
UserInfo.contextType = FirebaseContext;