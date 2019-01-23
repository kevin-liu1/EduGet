import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class Thankyou extends Component {
  render() {
    return (
      <div>
        <p>Your information has been submitted, please stayed tuned for further updates (We will send you an email)</p>
        <Link to="/create-profile"> click here </Link>
      </div>
    );
  }
}

export default Thankyou;
