import React, { Component } from 'react';
import SignUp from './SignUp';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import '../styles/App.css';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      auth: false
    }
  }
  componentDidMount(){
    if (localStorage.getItem('token') == null){
      this.setState({auth: false})
    }else{
      this.setState({auth: true})
    }
  }
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });
    const user_info = JSON.parse(localStorage.getItem('user_info'));
    const token = localStorage.getItem('token');

    const privatePage = (
      <div>
        <Header/>
        {
          user_info && user_info.admin_institution ? <Redirect to={`/school-admin`}/> :
          <Redirect to="/programs/recommended"/>
        }
        <p>Feed</p>
      </div>
    )
    const publicPage = (
      <div className="mainContainer">
        <div className="headlineOverlay">
          <Header/>
          <div className="headlineContainer">
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <h1 className="headline">Apply to the top universities in the world today!</h1>
              </Grid>
              <Grid>
                <MuiThemeProvider theme={theme}>
                  <Fab component={Link} to="/register" variant="extended" className="getStarted" color="primary">Get started</Fab>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
    return (
        <div>
          {this.state.auth?
            privatePage :
            publicPage
          }
        </div>
    );
  }
}

export default Main;
