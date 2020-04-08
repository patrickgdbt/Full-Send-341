import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
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

    const app = this.context as FirebaseRequirements;
    app.auth.signInWithEmailAndPassword(email, pass).catch(err => console.log(err));
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {
          fb =>
            fb?.auth.currentUser != null ?
              <Redirect to="/auth/feed" />
              :
              <InternalLogin handleSubmit={this.handleSubmit} ></InternalLogin>
        }
      </FirebaseContext.Consumer>
    )
  }
}
Login.contextType = FirebaseContext;


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function InternalLogin(props: any) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} onSubmit={props.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}