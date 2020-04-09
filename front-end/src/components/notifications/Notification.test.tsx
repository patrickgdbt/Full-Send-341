import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

it('notification render test', () => {
  const data = {
    userID: 'test',
    userName: 'test',
    type: 'comment',
  };

  const div = document.createElement('div');
  ReactDOM.render(
    <Notification notifData={data} />, div);
});

it('notification comment test', () => {
  const data = {
    userID: 'test',
    userName: 'test',
    type: 'comment',
  };

  const notif = <Notification notifData={data} />;
  expect(notif.props.notifData.type).toEqual('comment');
});

it('notification follow test', () => {
  const data = {
    userID: 'test',
    userName: 'test',
    type: 'follow',
  };

  const notif = <Notification notifData={data} />;
  expect(notif.props.notifData.type).toEqual('follow');
});