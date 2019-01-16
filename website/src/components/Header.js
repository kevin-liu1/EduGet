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
      password:"",
      auth: false
    }
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount(){
    if (localStorage.getItem('token') == null){
      this.setState({auth: false})
    }else{
      this.setState({auth: true})
    }
  }

  handleLogOut(e){
    localStorage.removeItem('token');
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });
    const privateLink = (
      <Grid container spacing ={24} justify="space-between" alignItems="center">
        <Grid item>
          <Button className="button" component={Link} to='/profile' color="inherit" fullWidth>Profile</Button>
        </Grid>
        <Grid item>
          <div onClick={this.handleLogOut}>
            <Button className="button" component={Link} to='/login' color="inherit" fullWidth>Logout</Button>
          </div>
        </Grid>
      </Grid>
    );

    const publicLink = (
      <form className="headerLayout">
        <Grid container spacing ={24} justify="space-between" alignItems="center">
          <Grid item>
            <Button className="button" component={Link} to='/login' color="inherit" fullWidth>Sign In</Button>
          </Grid>
          <Grid item>
            <Button className="button" component={Link} to='/register' variant="outlined" color="inherit" fullWidth>Create Account</Button>
          </Grid>
        </Grid>
      </form>
    )

    return (
      <div>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={24} justify="space-between" alignItems="center">
              <Grid item>
                <Link className="headerTitle" to="/">Eduget</Link>
              </Grid>
              <Grid item>
                {this.state.auth?
                  privateLink :
                  publicLink
                }
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
