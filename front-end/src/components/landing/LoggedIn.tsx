import React from 'react';
import CreatePostPage from '../posting/CreatePostPage';
import Feed from '../feed/Feed';
import { IPost, NoProps, FirebaseRequirements, IComment } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import { Grid, Button, Dialog, Slide, AppBar, Toolbar, Typography, makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Header from './Header';
import { Route } from 'react-router-dom';
import ProfilePage from '../profile/ProfilePage';

interface LoggedInState {
  posts: IPost[];
  open: boolean;
}

export default class LoggedIn extends React.Component<NoProps, LoggedInState> {
  constructor(props: NoProps) {
    super(props);

    this.state = {
      posts: [{} as IPost],
      open: false,
    };
  }

  componentDidMount() {
    const app = this.context as FirebaseRequirements;
    const posts = [] as IPost[];

    app.auth.onAuthStateChanged(user => {
      app.db.ref('users/' + app.auth.currentUser?.uid + '/following').once('value', snapshot => {
        var followingList: any[] = [];
        snapshot.forEach((child: any) => {
          followingList.push(child.val());
        });

        followingList.push(app.auth.currentUser?.uid);


        app.db.ref('posts').once('value', snapshot => {
          const root = snapshot.val();

          for (var key in root) {
            const post = root[key] as IPost;

            if (followingList.includes(post.userID)) {
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
          }

          this.setState({
            posts: posts
          });
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Route exact path='/auth/users/:id' component={ProfilePage} />
        <Route path="/auth/feed">
          <Grid
            container
            justify='center'
            style={{ paddingTop: '48px' }}
          >
            <Grid item xs={10} sm={6}>
              <Button
                variant='contained'
                fullWidth
                style={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  position: 'inherit',
                }}
                onClick={() => { this.setState({ open: true }) }}
              >
                <AddIcon style={{ color: 'red' }} />
              </Button>
            </Grid>
            <Feed
              posts={this.state.posts}
            />
            <Dialog
              fullScreen
              open={this.state.open}
              onClose={() => { this.setState({ open: false }) }}
              TransitionComponent={Transition}
              PaperProps={{ style: { backgroundColor: '#ececec', } }}
            >
              <PostingHeader close={() => { this.setState({ open: false }) }} />
              <CreatePostPage close={() => { this.setState({ open: false }) }} />
            </Dialog>
          </Grid>
        </Route>
      </div>
    );
  }
}
LoggedIn.contextType = FirebaseContext;

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    title: {
      flexGrow: 1,
    },
    header: {
      color: 'red',
      backgroundColor: 'white',
    },
    icon: {
      position: 'absolute',
    }
  }),
);

interface PostingHeaderProps {
  close: () => void;
}

function PostingHeader(props: PostingHeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense">
          <IconButton edge='start' onClick={props.close} aria-label='close' className={classes.icon}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Post
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}