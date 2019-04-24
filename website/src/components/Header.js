import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
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
import '../styles/App.css'
import '../styles/CreateProfile.css'
import Settings from './Settings'
import Avatar from '@material-ui/core/Avatar';
import profilepic from '../assets/profilepic.png'


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
      applications: null,
      notificationWindow: null,
      profile_pic: null
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
    if (localStorage.getItem('user_info') != null){
      this.setState({
        profile_pic: JSON.parse(localStorage.getItem('user_info')).profilepic
      })
    }
  }

  handleLogOut(e){
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');
  }

  toggleWindow(e){
    this.setState({window: e.currentTarget})
  }
  closeWindow(e){
    this.setState({window: null})
  }

  render() {

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
    const user_info = JSON.parse(localStorage.getItem('user_info'))
    const privateLink = (
      <Grid container spacing={24} justify="space-between" alignItems="center">
        <Grid item>
          {user_info && user_info.admin_institution ? 
            <Link className="headerTitle" to={`/school-admin`} ><img className="logo" src={logo}/></Link> :
            <Link className="headerTitle" to="/programs/recommended"><img className="logo" src={logo}/></Link>
          }
        </Grid>
        <Grid item>
          <Grid container spacing={24} justify="space-between" alignItems="center">
            <Grid item>
              <Button className="button" component={Link} to='/schools' color="inherit" fullWidth>Schools</Button>
            </Grid>
            <Grid item>
              <Button className="button" component={Link} to='/programs' color="inherit" fullWidth>Search Programs</Button>             
            </Grid>
            <Grid item>
              <Button className="button" component={Link} to='/applications' color="inherit" fullWidth>My Applications</Button>             
            </Grid>
          </Grid>
        </Grid>
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
                  <Avatar src={this.state.profile_pic == null ? profilepic : this.state.profile_pic}>
                  </Avatar>
                </Button>
              </Grid>
              <Menu id='menu' anchorEl={window} open={open} onClose={this.closeWindow}>
                <MenuItem component={Link} to='/profile'>Profile</MenuItem>
                {user_info && user_info.admin_institution ? "" :
                <MenuItem component={Link} to='/applications'>My Applications</MenuItem>
                }
                <Settings/>
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

export default (Header);
