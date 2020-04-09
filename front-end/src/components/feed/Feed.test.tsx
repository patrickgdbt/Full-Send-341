import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './Feed';
import { IPost } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';

it('feed render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <Feed posts={[]} />
    </FirebaseContext.Provider>, div);
});

it('feed props test', () => {
  const data = [{
    userID: 'testUser',
    userName: 'testName',
    postID: 'testID',
    caption: 'testCaption',
    imageURL: 'testImage',
    comments: [],
  } as IPost] as IPost[];

  const feed = <Feed posts={data} />;
  expect(feed.props.posts).toEqual(data);
  expect(feed.props.posts.length).toEqual(data.length);
});