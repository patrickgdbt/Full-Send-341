import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import { IPost } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';

it('post render test', () => {
  const data = {
    userID: 'testUser',
    userName: 'testName',
    postID: 'testID',
    caption: 'testCaption',
    imageURL: 'testImage',
    comments: [],
  } as IPost

  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <Post postData={data} />
    </FirebaseContext.Provider>, div);
});

it('post props test', () => {
  const data = {
    userID: 'testUser',
    userName: 'testName',
    postID: 'testID',
    caption: 'testCaption',
    imageURL: 'testImage',
    comments: [],
  } as IPost

  const post = <Post postData={data} />;
  expect(post.props.postData).toEqual(data);
});