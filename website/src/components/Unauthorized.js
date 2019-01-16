import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SignIn from './SignIn';

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <Header/>
        <p>Unauthorized access! Please <Link to="/login">Log In</Link></p>
      </div>
    );
  }
}

export default Unauthorized;
