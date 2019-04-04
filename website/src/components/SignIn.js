import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../styles/App.css'
import axios from 'axios';
import Header from './Header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { login } from '../actions/userAction';
import GLOBALS from '../config/common';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      auth: "",
      msg: ""
    }
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  onChangeEmail(e){
    this.setState({email: e.target.value});
  }

  onChangePassword(e){
    this.setState({password: e.target.value});
  }

  handleLogIn(e){
    e.preventDefault();
    var self = this;
    //send to database
    axios.post(GLOBALS.API_ROOT + "/api/token/auth/",{
      username: this.state.email,
      password: this.state.password
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      self.setState({auth: true});
      this.props.login(this.state.auth);
    }).catch((error)=>{
      console.log(error.response.data);
      self.setState({auth: false});
      self.setState({msg: error.response.data[Object.keys(error.response.data)[0]]});
      this.props.login(this.state.auth);
    })
  }

  render() {

    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });

    var errorStyle = {
      color: 'red'
    }

    return (
      <div className="signInContainer">
        <Header/>
        <div className="body-wrapper">
        <div className="signInCard">
          <Card>
            <CardContent>
              <Typography variant="h5">Sign In</Typography>
              <form onSubmit={this.handleLogIn}>
                <TextField className="signInSpacing" label="E-mail" autoComplete="no" fullWidth onChange={this.onChangeEmail}/>
                <TextField className="signInSpacing" label="Password" autoComplete="no" type="password" fullWidth onChange={this.onChangePassword}/>
                <div className="signInSpacing">
                  <MuiThemeProvider theme={theme}>
                    <Button className="button" variant="contained" size="large" color="primary" type="submit">Sign In</Button>
                  </MuiThemeProvider>
                  {
                    this.state.auth?
                    <Redirect to="profile"/> :
                    <p style={errorStyle}>{this.state.msg}</p>
                  }
                </div>
                <div className="signInSpacing">
                    <p>
                      <Link to="/register"> Create an Account </Link> |
                      <Link to="/password-reset"> Forgot Password?</Link>
                    </p>
               </div>
               </form>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  login: (auth) => dispatch(login(auth))
})

export default connect(undefined, mapActionsToProps)(SignIn)
