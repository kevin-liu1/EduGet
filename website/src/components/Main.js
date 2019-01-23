import React, { Component } from 'react';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import '../styles/App.css';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
    const privatePage = (
      <div>
        <Header/>
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
