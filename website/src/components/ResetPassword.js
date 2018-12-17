import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ResetPassword extends Component {
  render() {
    return (
      <div>
        <p>Follow these steps to reset your password</p>
        <p>Please enter your email</p>
        <p>*Ask the user for email</p>
        <p>We have sent you a password reset link, please check your email</p>
        <p>*Send the the email an email for password reset link</p>
        <p>Dont see your email? click <Link to="/new-password"> <u>here</u></Link> to resend.</p>
        <p>link currently set to set new password</p>


      </div>
    );
  }
}

export default ResetPassword;
