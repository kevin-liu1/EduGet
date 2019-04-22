import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/info.css'
import Grid from '@material-ui/core/Grid';
import Header from './Header';

class ResetPassword extends Component {
  render() {
    return (
        <div id="Page">
          <Header/>
            <div id="Content">
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                  <img src={require('../assets/eduget-logo.png')} alt="Eduget Logo"/>
                </Grid>
                <Grid item>
                  <h2>Reset password</h2>
                </Grid>
                <Grid item>
                  <h2>Please contact customer support</h2>
                </Grid>
                <Grid item>
                  <h2>Click <Link to="/"><u>here</u></Link> to return to home page</h2>
                </Grid>
              </Grid>
            </div>
          </div>
    );
  }
}

export default ResetPassword;
