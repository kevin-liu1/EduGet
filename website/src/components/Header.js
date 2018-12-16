import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { login } from '../actions/userAction';
import { Link } from 'react-router-dom';
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
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={24} justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h5" color="inherit">Eduget</Typography>
              </Grid>
              <Grid item>
                <form className="headerLayout">
                  <Grid container spacing ={24} justify="space-between" alignItems="center">
                    <Grid item>
                      <Input className="signInField" variant="filled" placeholder="Email" type="email" fullWidth onChange={(event)=>this.setState({email:event.target.value})}/>
                    </Grid>
                    <Grid item>
                      <Input className="signInField" variant="filled" placeholder="Password" type="password" fullWidth onChange={(event)=>this.setState({password:event.target.value})}/>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="inherit" fullWidth>Sign In</Button>
                    </Grid>
                    <Grid item>
                      <Link to="/password-reset">Forgot Password?</Link>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  login: (email,password) => dispatch(login(email,password))
})

export default connect(undefined, mapActionsToProps)(Header);
