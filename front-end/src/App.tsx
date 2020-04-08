import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import LandingPage from './components/landing/LandingPage';
import FirebaseContext from './firebase/context';
import Firebase from './firebase/firebase';

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/auth'>
            <LandingPage />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  );
}

export default App;