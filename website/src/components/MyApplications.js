import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import "../styles/School.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GLOBALS from "../config/common";
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Check from '@material-ui/icons/CheckCircleOutline';
import Close from '@material-ui/icons/Close';
import People from '@material-ui/icons/People';

const redbutton = createMuiTheme({ 
  root: {
      padding: "none"
  },
  palette: { primary: red } 
})
const bluebutton = createMuiTheme({ 
  root: {
      padding: "none"
  },
  palette: { primary: blue } 
})
const greenbutton = createMuiTheme({ 
  root :{
      padding: "none"
  },
  palette: { primary: green },
  overrides: {
      MuiButton: {
        raisedPrimary: {
          color: 'white',
        },
      },
    }
})

class MyApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: []
    };
    this.handleScroll = this.handleScroll.bind();
  }

  showChoices(choices) {
    switch (choices) {
      case "SUB":
        return (
          <TableCell padding="none" size="medium">
            Submitted
          </TableCell>
        );
        break;
      case "PEN":
        return (
          <TableCell padding="none" size="medium">
            Pending
          </TableCell>
        );
        break;
      case "APP":
        return (
          <TableCell padding="none" size="medium">
            Approved
          </TableCell>
        );
        break;
      case "WAI":
        return (
          <TableCell padding="none" size="medium">
            Waitlisted
          </TableCell>
        );
        break;
      case "REJ":
        return (
          <TableCell padding="none" size="medium">
            Rejected
          </TableCell>
        );
        break;
      case "WIT":
        return (
          <TableCell padding="none" size="medium">
            WithDrawn
          </TableCell>
        );
        break;
      case "ACC":
        return (
          <TableCell padding="none" size="medium">
            Accepted
          </TableCell>
        );
        break;
    }
  }

  //update state on load component
  componentDidMount() {
    const { match } = this.props;
    const id = match.params.uid;
    axios
      .get(GLOBALS.API_ROOT + "/api/applications/programs/", {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
      .then(response => {
        this.setState({ applications: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    let scrollTop = window.scrollY;
    console.log(scrollTop);
    this.setState({
      marginTop: scrollTop + "px"
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="body-wrapper">
          <h1>My Applications</h1>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item style={{ width: "100%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>School</TableCell>
                    <TableCell>Program</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.applications.map(row => (
                    <TableRow key={row.id}>
                      <TableCell padding="none" size="medium">
                        {row.program.institution.name}
                      </TableCell>
                      <TableCell padding="none" size="medium">
                        {row.program.name}
                      </TableCell>
                      <TableCell padding="none" size="medium">
                        {row.created.substring(0, 10)}
                      </TableCell>
                      <TableCell padding="none" size="medium">
                        {this.showChoices(row.status)}
                      </TableCell>
                      <TableCell padding="none" size="medium">
                        <MuiThemeProvider theme={greenbutton}>
                          <IconButton
                            // onClick={() => this.handleAccept(row.uid)}
                          >
                            <Check color="primary" />
                          </IconButton>
                        </MuiThemeProvider>
                        {/* <MuiThemeProvider theme={bluebutton}>
                          <IconButton
                            onClick={() => this.handleWaitlist(row.uid)}
                          >
                            <People color="primary" />
                          </IconButton>
                        </MuiThemeProvider> */}
                        <MuiThemeProvider theme={redbutton}>
                          <IconButton
                            // onClick={() => this.handleReject(row.uid)}
                          >
                            <Close color="primary" />
                          </IconButton>
                        </MuiThemeProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default MyApplications;
