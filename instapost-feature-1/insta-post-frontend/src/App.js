import React, { Component } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import LogIn from './components/auth/LogIn';
import TopBar from './components/layout/TopBar'
import { SnackBarProvider } from '../src/contexts';

function onAuthRequired({ history }) {
  console.log('history', history);
  history.push('/login');
}
class App extends Component {
  render() {
    return (
      <SnackBarProvider>
        <Router>
          <Switch>
            <Security issuer='https://dev-968110.okta.com'
              redirect_uri={window.location.origin + '/implicit/callback'}
              client_id='0oaf8vl6btMh6U5fu356'
              onAuthRequired={onAuthRequired} >
              <div className="App">
                <Route exact path='/posts' component={TopBar} />
                <Route exact path='/' component={NavBar} />
                <Route path='/login' render={() => <LogIn baseUrl='https://dev-968110.okta.com' />} />
                <Route path='/implicit/callback' component={ImplicitCallback} />
              </div>
            </Security>
          </Switch>
        </Router>
      </SnackBarProvider>
    );
  }
}

export default App;
