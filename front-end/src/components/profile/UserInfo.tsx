import React from 'react';
import { FirebaseRequirements } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import FollowComponent from '../followComponent/FollowComponent';

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
  }


  render() {
    return (
      <div>
        <table>
          <tbody>
            <td colSpan={2}>{this.state.userName}</td>
          </tbody>
          <tbody>
            <td>
              Followers: {this.state.followers.length}
            </td>
            <td>
              Following: {this.state.following.length}
            </td>
          </tbody>
          <tbody>
            <FollowComponent profileID = {this.props.id} followers = {this.state.followers}/>
          </tbody>
        </table>
      </div>
    );
  }
}
UserInfo.contextType = FirebaseContext;