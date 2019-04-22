import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import NavBar from './components/layout/NavBar';
import TopBar from './components/layout/TopBar';
import Posts from './components/pages/Posts';
import withAuth from './withAuth';

class App extends Component {
  state = {
    editing: null,
  };

  render() {
    const { auth } = this.props;
    console.log('props', this.props);
    const{match}=this.props;
    console.log('match',match.path);
    console.log('auth', auth);
    if (auth.loading) return null;
    const { user, login, logout } = auth;
  
    return (
      <div>
      <Container fluid>
        {user ? (
          <div>
            <TopBar logout={() => logout()}/>
            <Posts />
          </div>
        ) : (
          <NavBar login={() => login()}/>
        )}
      </Container>
      </div>
    );
  }
}

export default withAuth(App);
