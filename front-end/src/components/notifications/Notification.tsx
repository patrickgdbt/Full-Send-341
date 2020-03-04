import React, { Fragment } from 'react';
import { INotification } from '../../interfaces/common';
import { ListItem, ListItemAvatar, Avatar, Divider } from '@material-ui/core';

interface NotificationProps {
  notifData: INotification;
}

export default function Notification(props: NotificationProps) {
  return (
    <Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>{props.notifData.userName.charAt(0).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <div>
          <a
            href={'/users/' + props.notifData.userID}
            style={{
              textDecoration: 'none',
              fontWeight: 'bolder',
              color: 'black'
            }}
          >{props.notifData.userName} </a>commented on your post.
        </div>
      </ListItem>
      <Divider />
    </Fragment>
  );
}