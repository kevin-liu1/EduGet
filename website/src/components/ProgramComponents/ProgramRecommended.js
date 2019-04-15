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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteLoader from "react-infinite-loader";
import TextField from "@material-ui/core/TextField";
import GLOBALS from "../../config/common";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class ProgramRecommended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
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
          "/api/programs/recommended/?offset=" +
          this.state.offset +
          "&search=" +
          this.state.query +
          "&ordering=" +
          this.state.orderBy,
        {
          headers: { Authorization: "Token " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        let programs = this.state.programs.slice();
        programs = programs.concat(response.data.results);
        this.setState({ programs: programs });
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
          self.setState({ programs: [], offset: 0 });
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
            <h1>Discover Your Perfect Program</h1>
            
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
                <MenuItem value={"tuition"}>Tuition</MenuItem>
                <MenuItem value={"discipline"}>Discipline</MenuItem>
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
                {!this.state.programs ? (
                  <p>Loading.. </p>
                ) : (
                  <List items={this.state.programs} />
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
    return this.props.items.map(function(program) {
      return (
        <Grid item xs={12} key={program.uid}>
          <Link to={"/programs/" + program.uid}>
            <Card className="program-card">
              <CardContent>
                <div>
                  <img 
                    src={program.institution.logo}
                    alt="profilepic"
                    className="program-logo"
                  />
                  <p className="name">{program.name}</p>
                  <p className="location">
                  {program.institution.name} ({program.discipline})
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

export default ProgramRecommended;
