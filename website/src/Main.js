import React, { Component } from 'react';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import './App.css'

class Main extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item xs={6}>
              <SignUp/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Footer/>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default Main;
