import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewPassword extends Component {
  render() {
    return (
      <div>
        <p>password is encrypted we can only set a new password</p>
        <p>Please set your new password</p>
        <p>We recommend you choose a strong password</p>
        <p>please confirm your password</p>
        <p>*check two fields above are equal and not equal to user's current password</p>
        <p>(optional)check password complexity</p>
        <p>submit new password click <Link to="/"> <u>here</u></Link> and go to home page</p>

      </div>
    );
  }
}

export default NewPassword;
