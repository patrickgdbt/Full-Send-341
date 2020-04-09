import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';

it('comment render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <CommentBox postAuthorID='test' postID='test' comments={[]} />
    </FirebaseContext.Provider>, div)
});

it('comment props test', () => {
  const commentBox = <CommentBox postAuthorID='test' postID='test' comments={[]} />;

  expect(commentBox.props.postAuthorID).toEqual('test');
  expect(commentBox.props.postID).toEqual('test');
  expect(commentBox.props.comments).toEqual([]);
});