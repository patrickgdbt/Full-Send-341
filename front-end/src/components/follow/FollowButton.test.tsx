import React from 'react';
import ReactDOM from 'react-dom';
import FollowButton from './FollowButton';
import FirebaseContext from '../../firebase/context';
import FirebaseTest from '../../firebase/firebaseTest';

it('follow button render test', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirebaseContext.Provider value={new FirebaseTest()}>
      <FollowButton profileID='test' followers={[]} />
    </FirebaseContext.Provider>, div)
})

it('follow button props test', () => {
  const profileID = 'test';
  const followers = [] as string[];

  const followButton = <FollowButton profileID={profileID} followers={followers} />;
  expect(followButton.props.profileID).toEqual('test');
  expect(followButton.props.followers).toEqual([]);
});