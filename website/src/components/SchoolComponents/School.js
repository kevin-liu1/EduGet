import React, { Component } from "react";
import Header from "../Header.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputBase from "@material-ui/core/InputBase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import "../../styles/School.css";
import axios from "axios";
import SchoolPage from "./SchoolPage.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteLoader from "react-infinite-loader";

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      filtered: [],
      offset: 0,
      searchVal: ""
    };
    this.renderSchools = this.renderSchools.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    axios
      .get(
        "http://localhost:8000/api/institutions/?offset=" + this.state.offset,
        {
          headers: { Authorization: "Token " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        let schools = this.state.schools.slice();
        schools = schools.concat(response.data.results);
        this.setState({ schools: schools });
        this.handleChange();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleVisit() {
    this.setState({ offset: this.state.offset + 25 });
    this.loadItems();
  }

  renderSchools() {
    return this.state.filtered.map(school => {
      var link = "/schools/" + school.uid;
      var country =
        "https://www.countryflags.io/" + school.country + "/flat/24.png";
      return (
        <Grid item xl="auto" className="card">
          <Link to={link}>
            <Card>
              <CardContent>
                <div>
                  
                  <img
                    src={school.logo}
                    alt="profilepic"
                    className="school-logo"
                  />
                  <p className="name">{school.name}</p>
                  <p className="location">
                    <img className="flag" src={country} /> {school.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      );
    });
  }

  handleChange(e) {
    let searchVal = "";
    if(e){
      this.setState({
        searchVal: e.target.value
      });
      searchVal = e.target.value;
    } else {
      searchVal = this.state.searchVal;
    }
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (searchVal !== "") {
      // Assign the original list to currentList
      currentList = this.state.schools;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(school => {
        // change current item to lowercase
        const lc = school.name.toLowerCase();
        // change search term to lowercase
        const filter =  searchVal.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.schools
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="body-wrapper">
        <Card className="searchContainer">
          <CardContent className="searchContent">
            <h1>Discover Your Perfect School</h1>
            <InputBase
              className="searchSchoolBar"
              placeholder="Search..."
              onChange={this.handleChange}
            />
          </CardContent>
        </Card>
        <Card>
          <div className="school">
            <CardContent>
              <Grid
                container
                spacing={24}
                direction="row"
                justify="center"
                align-items="flex-start"
              >
                {!this.state.filtered ? (
                  <p>Loading.. </p>
                ) : this.renderSchools()
                }
                <InfiniteLoader onVisited={() => this.handleVisit()} />
              </Grid>
            </CardContent>
          </div>
        </Card>
        </div>
      </div>
    );
  }
}

export default School;
