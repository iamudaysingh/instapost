import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignIn';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      authenticated: null,
      success: false,
      token: {},
      user:'',
    };
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  onSuccess(res) {
    console.log('response', res);
    console.log('profile', res.user.profile.firstName);
    console.log('before success');
    if (res.status === 'SUCCESS') {
      console.log('AFTER SUCCESS');
      // this.props.auth.redirect({
      //   sessionToken: res.session.token
      // });
      this.setState({
        success: true,
        token: res.session.token,
        user: res.user.profile.firstName,
      })

    } else {
      // The user can be in another authentication state that requires further action.
      // For more information about these states, see:
      //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  onError(err) {
    console.log('error logging in', err);
  }

  render() {
    this.checkAuthentication();
    console.log('state of login', this.state);
    const { success, user } = this.state;
    console.log('success auth', this.props);
    if (this.state.authenticated === null) return null;

    return (
      <SignInWidget
        baseUrl={this.props.baseUrl}
        onSuccess={this.onSuccess}
        onError={this.onError}
        success={success}
        user={user}
      />
    )

  }
}
); 