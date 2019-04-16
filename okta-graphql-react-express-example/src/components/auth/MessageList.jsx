
import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { setContext } from 'apollo-link-context';
export default withAuth(class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null,
      tokenn: '',
    }
  }

  async componentDidMount() {
    const token = await this.props.auth.getAccessToken();
    const user = await this.props.auth.getUser();
    console.log('final token', token);
    console.log('final user', user);
    const authLink = setContext(async (_, {headers}) => {
      const token = await this.props.auth.getAccessToken();
      const user = await this.props.auth.getUser();
      console.log('final token', token);
      console.log('final user', user);
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          'x-forwarded-user': user ? JSON.stringify(user) : ''
        }
      }
    });








    // const{tokenn}= this.state;
    // const token = await this.props.auth.getAccessToken();
    // console.log('TOKEN :: ', token);
    // localStorage.setItem('Token', token);
    // console.log('-------------', localStorage.getItem('Token'));
    // this.setState({
    //     tokenn: token,
    // })
    // try {
    //   const response = await fetch('http://localhost:3000/login', {
    //     headers: {
    //         Authorization: `Bearer${token}`,
    //     }
    //   });
    //  const data = await response;
    //   console.log('data',data);
    //   this.setState({ messages: data.messages });
    // } catch (err) {
    //   console.log('inside catch of ml', err);
    //   // handle error as needed
    // }
  }
 
  render() {
    console.log('inside message list', this.state);
    if (!this.state.messages) return <div>Loading..</div>;
    const items = this.state.messages.map(message =>
      <li key={message}>{message}</li>
    );
    return <ul>{items}</ul>;
  }
})
