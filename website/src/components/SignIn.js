import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import '../styles/App.css'
import axios from 'axios';
import Header from './Header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: ""
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
    //send to database
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });
    return (
      <div className="signInContainer">
        <Header/>
        <div className="signInCard">
          <Card>
            <CardContent>
              <Typography variant="h5">Sign In</Typography>
              <form>
                <TextField className="signInSpacing" label="E-mail" autoComplete="no" fullWidth onChange={this.onChangeEmail}/>
                <TextField className="signInSpacing" label="Password" autoComplete="no" type="password" fullWidth onChange={this.onChangeInitPassword}/>
                <div className="signInSpacing" onClick={this.handleLogIn}>
                  <MuiThemeProvider theme={theme}>
                    <Button className="button" component={Link} to="/profile" variant="contained" size="large" color="primary">Sign In</Button>
                  </MuiThemeProvider>
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
    );
  }
}

export default SignIn;
