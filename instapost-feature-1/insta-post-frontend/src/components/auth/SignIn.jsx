import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect   } from 'react-router-dom';
import OktaSignIn from '@okta/okta-signin-widget';
// import logo from '../../../public/logo.png'
import Posts from '../pages/Posts';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

export default class SignInWidget extends Component {
  componentDidMount() {
      const el = ReactDOM.findDOMNode(this);
      console.log('el', el);
      this.widget = new OktaSignIn({
        baseUrl: this.props.baseUrl,
        logo: 'logo.png',
      });
      console.log('widget', this.widget);
      this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
  } 

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    const {success} = this.props;
    console.log('inside sign in widget', success);
    if(success){
    return (
      <Redirect to={{ pathname: '/posts' }}/>
    );
    // return(
    //   <Posts/>
    // )
  }
  return(
    <p>
    </p>
  )
}
}
