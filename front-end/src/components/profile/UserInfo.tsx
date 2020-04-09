import React from 'react';
import { FirebaseRequirements } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import FollowButton from '../follow/FollowButton';
import { Grid, Typography, Divider } from '@material-ui/core';

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

  updateUserName(name: any) {
    this.setState({ userName: name });
  }

  updateButton(message: string) {
    this.setState({ button: message });
  }

  componentDidMount() {
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

      this.setState({ followers: followersList });
    })

    app.db.ref('users/' + userID + '/following').once('value').then(snapshot => {

      var followingList: any = [];
      snapshot.forEach((child: any) => {
        followingList.push(child.val());
      });

      this.setState({ following: followingList });
    })

    app.auth.onAuthStateChanged(user => {
      this.forceUpdate();
    });
  }


  render() {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Grid item xs={12} sm={6}>
          <Grid container justify='center'
            alignItems='center'>
            <Grid item xs={12} sm={4}>
              <Typography variant='h4'>
                {this.state.userName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>
                Followers: {this.state.followers.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography>
                Following: {this.state.following.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FollowButton profileID={this.props.id} followers={this.state.followers} />
            </Grid>
            <Grid item style={{ marginTop: '20px' }} xs={12} sm={12}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
UserInfo.contextType = FirebaseContext;