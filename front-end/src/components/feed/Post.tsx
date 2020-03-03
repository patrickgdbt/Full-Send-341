import React from 'react';
import { makeStyles, Theme, createStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IPost } from '../../interfaces/common';
import CommentBox from '../comment/CommentBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: 20,
      textAlign: 'left'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface PostProps {
  postData: IPost;
  preview?: boolean;
}

export default function Post(props: PostProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postData = props.postData;
  
  return (
    <Grid item className={classes.root} sm={6}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {postData.userName ? postData.userName.charAt(0).toUpperCase() : ''}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.preview ? postData.userName + ' (PREVIEW)' : postData.userName}
        />
        <CardMedia
          className={classes.media}
          image={postData.imageURL ? postData.imageURL : 'placeholder'}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {postData.caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            disabled={props.preview}  
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment"
            onClick={handleExpandClick}
            aria-expanded={expanded}
            disabled={props.preview}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            disabled={props.preview}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{paddingTop: '0px', paddingBottom: '10px'}}>
            <CommentBox 
              postID={postData.postID}
              comments={postData.comments}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
