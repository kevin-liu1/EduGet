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
      schools: null,
      schoolSearch: null,
      searchFlag: false
    }
    this.renderSchools = this.renderSchools.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchSchools = this.searchSchools.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/institutions/?limit=866',{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      this.setState({schools: response.data.results});
    }).catch((error)=>{
      console.log(error);
    })
  }

  renderSchools(){
    return(
      this.state.schools.map(school => {
        var link = "/schools/" + school.uid;
        var country = "https://www.countryflags.io/"+ school.country +"/flat/24.png"
        return(
          <Grid item xl='auto' className="card">
            <Link to={link}>
              <Card>
                <CardContent >
                  <div>
                    <img src={school.logo} alt="profilepic" className="school-logo"/>
                    <p className="name">{school.name}</p>
                    <p className="location"><img className="flag" src={country}/> {school.location}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )
      })
    ) 
  }
  handleSearch(e){
    this.setState({schoolSearch: e.target.value})
  }
  searchSchools(){
    return(
    this.state.schools.map(school => {
      if (school.name.search(new RegExp(this.state.schoolSearch, "i")) != -1){
        this.setState({searchFlag: true})
        var link = "/schools/" + school.uid;
        var country = "https://www.countryflags.io/"+ school.country +"/flat/24.png"
        return(
          <Grid item xl='auto' className="card">
            <Link to={link}>
              <Card>
                <CardContent >
                  <div>
                    <img src={school.logo} alt="profilepic" className="school-logo"/>
                    <p className="name">{school.name}</p>
                    <p className="location"><img className="flag" src={country}/> {school.location}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        )
      }
    })
    )
  }

  render() {
    return (
        <div>
            <Header/>
            <Card className="searchContainer">
              <CardContent  className="searchContent">
                <h1>Discover Your Perfect School</h1>
                <InputBase className="searchSchoolBar" placeholder="Search..." onChange={this.handleSearch}/>
              </CardContent>
            </Card>
            <Card>
              <div className="school">
                <CardContent>
                    <Grid container spacing={24} direction="row" justify="center" align-items="flex-start">
                        {!this.state.schools ? <p>Loading.. </p> : !this.state.schoolSearch ? this.renderSchools() : this.searchSchools()}
                    </Grid>
                </CardContent>
              </div>
            </Card>
        </div>
    );
  }
}

export default School;
