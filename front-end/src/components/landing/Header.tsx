import React from 'react';
import { fade, createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Button, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FirebaseContext from '../../firebase/context';
import NotificationsButton from '../notifications/NotificationButton';

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
    },
    header: {
      color: 'red',
      backgroundColor: 'white',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
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
          <Typography variant="h6" className={classes.title}>
            FULL SEND
          </Typography>
          <div className={classes.root} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <NotificationsButton />
            <FirebaseContext.Consumer>
              {
                fb =>
                  <IconButton aria-label="show 4 new mails" color="inherit" href={'users/' + fb?.auth.currentUser?.uid}>
                    <AccountCircle />
                  </IconButton>
              }
            </FirebaseContext.Consumer>
            <FirebaseContext.Consumer>
              {fb => <Button color="inherit" onClick={() => fb?.auth.signOut()}>Logout</Button>}
            </FirebaseContext.Consumer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}