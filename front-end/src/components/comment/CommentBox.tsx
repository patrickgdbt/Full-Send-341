import React from "react";
import { IComment, FirebaseRequirements } from '../../interfaces/common';
import { Grid, InputBase, Divider, Button, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import FirebaseContext from "../../firebase/context";

interface CommentsProps {
  postID: string;
  comments: IComment[];
}

interface CommentsState {
  comments: IComment[];
}

export default class CommentBox extends React.Component<CommentsProps, CommentsState> {
  constructor(props: CommentsProps) {
    super(props);
    
    this.state = {
      comments: props.comments
    }
  }

  addComment(comment: string) {
    const app = this.context as FirebaseRequirements;
    const newComment = {
      comment: comment,
      userID: app.auth.currentUser?.uid,
      userName: app.auth.currentUser?.displayName,
    } as IComment;
    
    app.db.ref('posts/' + this.props.postID + '/comments').push(newComment);
    
    const comments = this.state.comments;
    comments.push(newComment);
    this.setState({
      comments: comments
    });
  }

  render() {
    return (
      <Grid container direction='column'>
        <Grid item sm={12} style={{ overflow: 'auto', maxHeight: '123px' }}>
          <Grid container direction='column'>
            {this.state.comments.map((c,i) => <Comment key={i} comment={c} />)}
          </Grid>
        </Grid>
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
        <PostComment post={this.addComment.bind(this)} />
      </Grid>
    );
  }
}
CommentBox.contextType = FirebaseContext;

function PostComment(props: any) {
  const [input, setInput] = React.useState('');
  const [alert, setAlert] = React.useState(false);

  const onClick = () => {
    if (input !== '') {
      props.post(input);
      setInput('');
      setAlert(true);
    }
  }

  return (
    <Grid item sm={12}>
      <InputBase
        value={input}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            onClick();
          }
        }}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        placeholder='Add a comment'
        endAdornment={
          <Button
            disabled={input === ''}
            onClick={onClick}
          >
            <SendIcon />
          </Button>
        }
      />
      <Snackbar open={alert} autoHideDuration={4000} onClose={() => { setAlert(false) }} >
        <MuiAlert elevation={6} variant='filled' severity='success' onClose={() => { setAlert(false) }}>
          Comment posted
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}

function Comment(props: any) {
  return (
    <Grid item sm={12}>
      <a
        href={'/users/' + props.comment.userID}
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          color: 'black'
        }}
      >{props.comment.userName} </a>{props.comment.comment}
    </Grid>
  );
}

