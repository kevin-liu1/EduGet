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
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/Icon';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../styles/App.css'
import logo from '../assets/eduget-logo.png'

import '@material-ui/icons/AccountCircle';

const styles = theme => ({
  input: {
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      auth: false,
      window: null,
    }
    this.handleLogOut = this.handleLogOut.bind(this);
    this.toggleWindow = this.toggleWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
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

  toggleWindow(e){
    this.setState({window: e.currentTarget})
  }
  closeWindow(e){
    this.setState({window: null})
  }

  render() {
    const { classes } = this.props;

    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      },
      typography: {
        useNextVariants: true,
      },
    });

    const {email, password, auth, window} = this.state;
    const open = Boolean(window);

    const privateLink = (
      <Grid container spacing={24} justify="space-between" alignItems="center">
        <Grid item>
          <Link className="headerTitle" to="/"><img className="logo" src={logo}/></Link>
        </Grid>
        {/* <Grid item className="searchContainer">
          <InputBase className="search" placeholder="Search..." classes={{input: classes.input}}/>
        </Grid> */}
        <Grid item className="headerLayout">
            <Grid container spacing ={8} justify="space-between" alignItems="center">
              <Grid item>
                <Button color="inherit">
                  <MailIcon/>
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit">
                  <NotificationsIcon/>
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" aria-label="More" aria-owns={open ? 'menu' : undefined} aria-haspopup="true" onClick={this.toggleWindow}>
                  <AccountCircle/>
                </Button>
              </Grid>
              <Menu id='menu' anchorEl={window} open={open} onClose={this.closeWindow}>
                <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                <MenuItem component={Link} to='/applications'>My Applications</MenuItem>
                <MenuItem onClick={this.handleLogOut} component={Link} to='/login'>Log out</MenuItem>
              </Menu>
            </Grid>
        </Grid>
      </Grid>
    );

    const publicLink = (
      <Grid container spacing={24} justify="space-between" alignItems="center">
        <Grid item>
          <Link className="headerTitle" to="/"><img className="logo" src={logo}/></Link>
        </Grid>
        <Grid item className="headerLayout">
          <Grid container spacing ={24} justify="space-between" alignItems="center">
            <Grid item>
              <Button className="button" component={Link} to='/login' color="inherit" fullWidth>Sign In</Button>
            </Grid>
            <Grid item>
              <Button className="button" component={Link} to='/register' variant="outlined" color="inherit" fullWidth>Create Account</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )

    return (
      <div>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            {this.state.auth?
              privateLink :
              publicLink
            }
          </Toolbar>
        </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
