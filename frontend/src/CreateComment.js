import React, { Component } from 'react';
import Nav from './Nav';
import LoginForm from './CreateComment';
import './App.css';

import  { connect } from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      username: ''
    };
  }

  componentDidMount() {
    
  }

  

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {


    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
    let appTheme = this.props.theme
              ? "App"
              : "App blackTheme"
    return (
      <>
      <div className={appTheme}>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${localStorage.getItem('username')}`
            : 'Please Log In'}
        </h3>
      </div>
      </>
    );
  }
}

export default App;