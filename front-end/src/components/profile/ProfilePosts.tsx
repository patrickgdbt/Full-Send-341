import React from 'react';
import './ProfileStyle.css';
import FirebaseContext from '../../firebase/context';
import { IPost, FirebaseRequirements, IComment } from '../../interfaces/common';
import { Grid } from '@material-ui/core';
import Post from '../feed/Post';

export default class ProfilePosts extends React.Component<UserProps, UserState>{
  constructor(props: any) {
    super(props);
    this.state = { 
      posts: []
    };
  }

  componentDidMount(){
    const app = this.context as FirebaseRequirements;
    const profileID = this.props.id;

    const postsIDs: any = [];
    const posts = [] as IPost[];

    app.db.ref('users/' + profileID + '/posts').once('value').then(snapshot => {
      snapshot.forEach((child: any) => {
        postsIDs.push(child.val());
      });
    })

    app.db.ref('posts').once('value', snapshot => {
      const root = snapshot.val();

      for (var key in root) {
        if(postsIDs.includes(key)){
          const post = root[key];
          const comments = [] as IComment[];
  
          for (var comment in post.comments) {
            comments.push(post.comments[comment]);
          }
  
          posts.push({
            postID: key,
            caption: post.caption,
            imageURL: post.imageURL,
            userID: post.userID,
            userName: post.userName,
            comments: comments,
          });
        }
      };
      this.setState({
        posts: posts
      });
    });
  }

  render() {
    return (
      <div>
        <Grid container direction='column' justify='center' alignItems='center'>
          {this.state.posts.map((postData, i, posts) => <Post key={i} postData={posts[posts.length-i-1]} />)}
        </Grid>
      </div>
    );
  }
}
ProfilePosts.contextType = FirebaseContext;

interface UserProps {
  id: any
 }

interface UserState {
  posts: IPost[]
}