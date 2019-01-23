import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class Thankyou extends Component {
  render() {
    return (
      <p>Your information has been submitted, please stayed tuned for further updates. (We will send you an email) Click <Link to="/"> <u>here</u></Link> to return to home page</p>
    );
  }
}

export default Thankyou;
