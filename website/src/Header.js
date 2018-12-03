import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css'

class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
  }
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid container spacing={24} justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h5" color="inherit">WiseTurn</Typography>
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
                      <a className="forgotPw" href="none">Forgot Password?</a>
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

export default Header;
