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
import TextField from "@material-ui/core/TextField";
import GLOBALS from "../../config/common";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      offset: 0,
      query: "",
      typing: false,
      typingTimeout: 0,
      orderBy: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    axios
      .get(
        GLOBALS.API_ROOT +
          "/api/institutions/?offset=" +
          this.state.offset +
          "&search=" +
          this.state.query +
          "&ordering=" +
          this.state.orderBy,
        (localStorage.getItem("token") ? {
          headers: { Authorization: "Token " + localStorage.getItem("token") }
        } : {})
      )
      .then(response => {
        let schools = this.state.schools.slice();
        schools = schools.concat(response.data.results);
        this.setState({ schools: schools });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleVisit(e) {
    this.setState({ offset: this.state.offset + 25 });
    this.loadItems();
  }

  handleChange(e) {
    if (e.target.name == "order-by") {
      this.setState({ orderBy: e.target.value });
    } else if (e.target.name == "search") {
      this.setState({ query: e.target.value });
    }

    const self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      typing: false,
      typingTimeout: setTimeout(function() {
          self.setState({ schools: [], offset: 0 });
          self.loadItems();
      }, 250)
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="body-wrapper">
          <CardContent className="searchContent">
            <h1>Discover Your Perfect School</h1>
            
            <TextField
              id="filled-search"
              label="Search"
              type="search"
              margin="normal"
              name="search"
              className="searchSchoolBar"
              onChange={this.handleChange}
            />
            <FormControl>
              <InputLabel htmlFor="order-by">Order By:</InputLabel>
              <Select
                autoWidth
                value={this.state.orderBy}
                onChange={this.handleChange}
                inputProps={{
                  name: "order-by",
                  id: "order-by"
                }}
                style={{ width: "120px" }}
              >
                <MenuItem value="">
                  <em>Default</em>
                </MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"cost_of_living"}>Cost of Living</MenuItem>
                <MenuItem value={"scores_overall_rank"}>Ranking (Overall)</MenuItem>
                <MenuItem value={"scores_teaching_rank"}>Ranking (Teaching)</MenuItem>
                <MenuItem value={"scores_research_rank"}>Ranking (Research)</MenuItem>
                <MenuItem value={"scores_citations_rank"}>Ranking (Citations)</MenuItem>
                <MenuItem value={"scores_industry_income_rank"}>Ranking (Industry)</MenuItem>
                <MenuItem value={"scores_international_outlook_rank"}>Ranking (International Outlook)</MenuItem>
                <MenuItem value={"stats_number_students"}>Number of Students</MenuItem>
                <MenuItem value={"stats_student_staff_ratio"}>Student Staff Ratio</MenuItem>
                <MenuItem value={"stats_pc_intl_students"}>% International Students</MenuItem>
                <MenuItem value={"stats_female_male_ratio"}>Female to Male Ratio</MenuItem>
                <MenuItem value={"country"}>Country</MenuItem>
              </Select>
            </FormControl>
          </CardContent>

          <div className="school">
            <CardContent>
              <Grid
                container
                spacing={24}
                direction="row"
                justify="center"
                align-items="flex-start"
              >
                {!this.state.schools ? (
                  <p>Loading.. </p>
                ) : (
                  <List items={this.state.schools} />
                )}
                <InfiniteLoader onVisited={() => this.handleVisit()} />
              </Grid>
            </CardContent>
          </div>
        </div>
      </div>
    );
  }
}

class List extends Component {
  render() {
    return this.props.items.map(function(school) {
      return (
        <Grid item xl="auto" key={school.uid}>
          <Link to={"/schools/" + school.uid}>
            <Card className="school-card">
              <CardContent>
                <div>
                  <img 
                    src={school.logo}
                    alt="profilepic"
                    className="school-logo"
                  />
                  <p className="name">{school.name}</p>
                  <p className="location">
                    <img
                      className="flag"
                      alt={school.country}
                      src={
                        "https://www.countryflags.io/" +
                        school.country +
                        "/flat/24.png"
                      }
                    />{" "}
                    {school.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      );
    });
  }
}

export default School;
