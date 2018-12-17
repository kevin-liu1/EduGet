import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { login } from '../actions/userAction';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../styles/App.css'

class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.logIn = this.logIn.bind(this);
  }
  onChangeEmail(e){
    this.setState({email: e.target.value});
  }
  onChangePassword(e){
    this.setState({password: e.target.value});
    console.log(this.state)
  }
  logIn(e){
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });

    return (
      <div>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={24} justify="space-between" alignItems="center">
              <Grid item>
                <h2>Eduget</h2>
              </Grid>
              <Grid item>
                <form className="headerLayout">
                  <Grid container spacing ={24} justify="space-between" alignItems="center">
                    <Grid item>
                      <Button component={Link} to='/login' color="inherit" fullWidth>Sign In</Button>
                    </Grid>
                    <Grid item>
                      <Button component={Link} to='/register' variant="outlined" color="inherit" fullWidth>Create Account</Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  login: (email,password) => dispatch(login(email,password))
})

export default connect(undefined, mapActionsToProps)(Header);
