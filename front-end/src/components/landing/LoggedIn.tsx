import React from 'react';
import CreatePostPage from '../posting/CreatePostPage';
import Feed from '../feed/Feed';
import { IPost, NoProps, FirebaseRequirements, IComment } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import { Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

interface LoggedInState {
  posts: IPost[];
}

export default class LoggedIn extends React.Component<NoProps, LoggedInState> {
  constructor(props: NoProps) {
    super(props);

    this.state = {
      posts: [{} as IPost]
    };
  }

  componentDidMount() {
    const app = this.context as FirebaseRequirements;
    const posts = [] as IPost[];

    app.db.ref('posts').once('value', snapshot => {
      const root = snapshot.val();
      
      for (var key in root) {
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

      this.setState({
        posts: posts
      });
    });
  }

  render() {
    return (
      <Grid 
        container 
        justify='center'
        style={{backgroundColor: '#ececec'}}
      >
        <Grid item xs={10} sm={6}>
          <Button
            variant='contained'
            fullWidth
            style={{
              marginTop: '30px',
              marginBottom: '30px',
              backgroundColor: 'white',
            }}
          >
            <AddIcon style={{color: 'red'}}/>
          </Button>
        </Grid>
        <Feed 
          posts={this.state.posts}
        />
      </Grid>
    );
  }
}
LoggedIn.contextType = FirebaseContext;