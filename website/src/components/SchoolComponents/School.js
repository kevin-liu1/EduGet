import React, { Component } from 'react';
import Header from '../Header.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import "../../styles/School.css";
import axios from 'axios';
import SchoolPage from './SchoolPage.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class School extends Component {
  constructor(props){
    super(props);
    this.state = {
      schools: null
    }
    this.renderSchools = this.renderSchools.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/institutions/',{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log(response.data)
      this.setState({schools: response.data.results});
      console.log(this.state.schools)
    }).catch((error)=>{
      console.log(error);
    })
  }

  renderSchools(){
    console.log(this.state.schools)
    return(
      this.state.schools.map(school => {
          <Grid item xl='auto'>
              <Card className="card">
                <CardContent>
                  <div>
                    <p>{school.name}</p>
                    <p>{school.location}</p>
                  </div>
                </CardContent>
              </Card>
          </Grid>
      })
    )
  }
  render() {
    console.log(this.state.schools)
    return (
        <div>
            <Header/>
            <Card>
              <CardContent>
                <InputBase className="search" placeholder="Search..."/>
              </CardContent>
            </Card>
            <Card>
              <div className="school">
                <CardContent>
                    <Grid container spacing={24} direction="row" justify="center" align-items="flex-start">
                        {!this.state.schools ? <p>Loading</p>:
                          this.renderSchools()}
                    </Grid>
                </CardContent>
              </div>
            </Card>
        </div>
    );
  }
}

export default School;
