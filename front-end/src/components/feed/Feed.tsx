import React from 'react';
import { IPost } from '../../interfaces/common';
import { Grid } from '@material-ui/core';
import Post from './Post';

interface FeedProps {
  posts: IPost[]
}

export default function Feed(props: FeedProps) {
  console.log(props.posts)
  return (
    <Grid item xs={10} sm={12}>
      <Grid container direction='column' justify='center' alignItems='center'>
        {props.posts.map((postData, i, posts) => <Post key={i} postData={posts[posts.length-i-1]}/>)}
      </Grid>
    </Grid>
  );
}