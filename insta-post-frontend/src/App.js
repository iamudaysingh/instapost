import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'; 
import LogIn from './components/auth/LogIn';
import HomePage from './components/layout/HomePage';

function onAuthRequired({history}) {
  console.log('history', history);
  history.push('/login');
}
class App extends Component {
  render() {
    return (
      <Router>  
        <Security issuer='https://dev-968110.okta.com/oauth2/default'
                  client_id='0oaf8vl6btMh6U5fu356'
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
        <div className="App">
          <NavBar />
          {/* <Route path='/' render={() => <LogIn baseUrl='https://dev-968110.okta.com/oauth2/default' />} /> */}
          <Route path='/login' render={() => <LogIn baseUrl='https://dev-968110.okta.com/oauth2/default' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
          {/* <Route path="/" exact={true} component={LogIn} />
          <Route path="/login" exact={true} component={LogIn} /> */}
        </div>
        </Security>
      </Router>
    );
  }
}

export default App;
