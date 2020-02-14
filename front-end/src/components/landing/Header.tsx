import React from 'react';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import FirebaseContext from '../../firebase/context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            FULL SEND
          </Typography>
          <FirebaseContext.Consumer>
            {
              fb => fb?.auth.currentUser ?
                <Button color="inherit" onClick={() => fb.auth.signOut()}>Logout</Button>
                :
                <Button color="inherit" href="/login">Login</Button>
            }
          </FirebaseContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}