import React from 'react';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FirebaseContext from '../../firebase/context';
import NotificationsButton from '../notifications/NotificationButton';
import SearchBar from '../search/SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      cursor: 'pointer',
    },
    header: {
      color: 'red',
      backgroundColor: 'white',
      position: 'fixed'
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title} onClick={() => window.location.href = '/auth/feed' }>
            FULL SEND
          </Typography>
          <div className={classes.root} />
            <SearchBar />
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <NotificationsButton />
            <FirebaseContext.Consumer>
              {
                fb =>
                  <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => window.location.href = '/auth/users/' + fb?.auth.currentUser?.uid}>
                    <AccountCircle />
                  </IconButton>
              }
            </FirebaseContext.Consumer>
            <FirebaseContext.Consumer>
              {fb => <Button color="inherit" onClick={() => { fb?.auth.signOut(); window.location.href = '/'; } }>Logout</Button>}
            </FirebaseContext.Consumer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}