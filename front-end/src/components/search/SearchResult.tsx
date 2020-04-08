import React from 'react';
import { IBasicUser } from '../../interfaces/common';
import { ListItem, ListItemAvatar, Avatar, Divider } from '@material-ui/core';

interface SearchResultProps {
  userInfo: IBasicUser;
}

export default function SearchResult(props: SearchResultProps) {
  return (
    <div>
      <ListItem button onClick={() => window.location.href = '/auth/users/' + props.userInfo.userID}>
        <ListItemAvatar>
          <Avatar>{props.userInfo.userName.charAt(0).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <a
            href={'/auth/users/' + props.userInfo.userID}
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >{props.userInfo.userName} </a>
        </div>
      </ListItem>
      <Divider />
    </div>
  );
}