import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import Posts from './components/pages/Posts';
import withAuth from './withAuth';

class App extends Component {
  state = {
    editing: null,
  };

  render() {
    const { auth } = this.props;
    if (auth.loading) return null;
    const { user, login, logout } = auth;

    return (
      <Container fluid>
        {user ? (
          <div>
            <Posts />
            <Button
              className="m-2"
              color="secondary"
              onClick={() => logout()}
            >
              Sign Out (signed in as {user.name})
            </Button>
          </div>
        ) : (
          <Button
            className="my-2"
            color="primary"
            onClick={() => login()}
          >
            Sign In
          </Button>
        )}
      </Container>
    );
  }
}

export default withAuth(App);
