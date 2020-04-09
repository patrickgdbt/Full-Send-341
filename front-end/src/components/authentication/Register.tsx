import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FirebaseRequirements } from '../../interfaces/common';
import FirebaseContext from '../../firebase/context';
import { Redirect } from 'react-router-dom';

export default class Register extends React.Component {
  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const app = this.context as FirebaseRequirements;
    app.auth.onAuthStateChanged(user => {
      this.forceUpdate();
    });
  }

  handleSubmit(e: React.FormEvent<Element>) {
    e.preventDefault();

    const data = new FormData(e.target as any);
    const email = data.get('email') as string;
    const pass = data.get('password') as string;
    const dName = data.get('displayName') as string;

    const app = this.context as FirebaseRequirements;

    if (/((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})/.test(pass)) {
      app.auth.createUserWithEmailAndPassword(email, pass)
        .then((user: firebase.auth.UserCredential) => {
          app.db.ref('users')
            .child(user.user!.uid)
            .set({
              displayName: dName,
              newNotifs: 0,
            });

          user.user?.updateProfile({ displayName: dName });
        });
    }
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {
          fb =>
            fb?.auth.currentUser ?
              <Redirect to="/" />
              :
              <InternalRegister handleSubmit={this.handleSubmit} />
        }
      </FirebaseContext.Consumer>

    )
  }
}
Register.contextType = FirebaseContext;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function InternalRegister(props: any) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
