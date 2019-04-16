import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { SnackBarProvider } from '../src/contexts';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';

ReactDOM.render(
  <SnackBarProvider>
  <BrowserRouter>
    <Security
      issuer='https://dev-968110.okta.com'
      redirect_uri={`${window.location.origin}/implicit/callback`}
      client_id='0oaf8vl6btMh6U5fu356'
    >
      <ApolloProvider client={client}>
        <Route path="/implicit/callback" component={ImplicitCallback} />
        <Route path="/" component={App} />
      </ApolloProvider>
    </Security>
  </BrowserRouter>
  </SnackBarProvider>,
  document.getElementById('root')
);
registerServiceWorker();
if (module.hot) module.hot.accept();
