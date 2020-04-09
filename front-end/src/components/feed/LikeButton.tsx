import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FirebaseRequirements, IPost } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';

interface LikeButtonProps {
  postData: IPost;
  preview?: boolean;
}

interface LikeButtonState {
  likes: Number;
}

export default class LikeButton extends React.Component<LikeButtonProps, LikeButtonState> {
  constructor(props: LikeButtonProps) {
    super(props);

    this.state = {
      likes: 0,
    };
    
    this.like = this.like.bind(this);
  }

  componentDidMount() {
    const app = this.context as FirebaseRequirements;

    app.db.ref('posts/' + this.props.postData.postID + '/likes')
      .on('value', snapshot => {
        this.setState({
          likes: snapshot.val(),
        });
      });
  }

  componentWillUnmount() {
    const app = this.context as FirebaseRequirements;

    app.db.ref('posts/' + this.props.postData.postID + '/likes').off();
  }

  like() {
    const app = this.context as FirebaseRequirements;

    app.db.ref('posts/' + this.props.postData.postID + '/likes')
      .once('value', snapshot => {
        app.db.ref('posts/' + this.props.postData.postID + '/likes').set(snapshot.val() + 1);
      });
  }

  render() {
    return (
      <IconButton
        aria-label="like"
        disabled={this.props.preview}
        onClick={this.like}
      >
        <Badge badgeContent={this.state.likes} color='secondary'>
          <FavoriteIcon style={{ color: 'red' }} />
        </Badge>
      </IconButton>
    );
  }
}
LikeButton.contextType = FirebaseContext;