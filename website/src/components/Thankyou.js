import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/info.css'
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Footer from './Footer';

class Thankyou extends Component {


  render() {
    return (
      <div id="Page">
          <Header/>
          <div id="Content">
              <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                      <h2>Your information has been submitted, please log in now.</h2>
                  </Grid>
                  <Grid item>
                      <h2>Click <Link to="/"><u>here</u></Link> to return to home page</h2>
                  </Grid>
              </Grid>
          </div>
          <Footer/>
      </div>
      );
      }
  }
export default Thankyou;
