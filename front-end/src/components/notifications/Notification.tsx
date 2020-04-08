import React, { Fragment } from 'react';
import { INotification } from '../../interfaces/common';
import { ListItem, ListItemAvatar, Avatar, Divider } from '@material-ui/core';

interface NotificationProps {
  notifData: INotification;
}

export default function Notification(props: NotificationProps) {
  const message = props.notifData.type === 'comment' ? 'commented on your post.' : 'followed you.';
  return (
    <Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>{props.notifData.userName.charAt(0).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <div>
          <a
            href={'/auth/users/' + props.notifData.userID}
            style={{
              textDecoration: 'none',
              fontWeight: 'bolder',
              color: 'black'
            }}
          >{props.notifData.userName} </a> { message }
        </div>
      </ListItem>
      <Divider />
    </Fragment>
  );
}