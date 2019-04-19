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
    this.handleScroll = this.handleScroll.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleRejct = this.handleReject.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  handleAccept(id){
    axios.put(GLOBALS.API_ROOT + '/api/applications/programs/'+id+'/',{
      applicant_status: 'ACC'
    },{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log("Applicant accepted offer")
      let applicant = this.state.applications.slice()
      applicant.forEach(function (app,i){
        if (app.uid == id ){
          applicant[i].applicant_status = 'Accepted'
        }
      })
      this.setState({applicants: applicant})
    }).catch((error)=>{
      console.log(error.response);
    })
  }

  handleReject(id){
    axios.put(GLOBALS.API_ROOT + '/api/applications/programs/'+id+'/',{
      applicant_status: 'WIT'
    },{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log("Applicant withdrew")
      let applicant = this.state.applications.slice()
      applicant.forEach(function (app,i){
        if (app.uid == id ){
          applicant[i].applicant_status = 'Withdrawn'
        }
      })
      this.setState({applicants: applicant})
    }).catch((error)=>{
      console.log(error.response);
    })
  }

  renderActions(row){
    if (row.status == "Approved"){
      return(
          <TableCell padding="none" size="medium">
            <MuiThemeProvider theme={greenbutton}>
              <IconButton
                onClick={() => this.handleAccept(row.uid)}
              >
                <Check color="primary" />
              </IconButton>
            </MuiThemeProvider>
            <MuiThemeProvider theme={redbutton}>
              <IconButton
                onClick={() => this.handleReject(row.uid)}
              >
                <Close color="primary" />
              </IconButton>
            </MuiThemeProvider>
          </TableCell> 
      )
    }
    else{
      return(
        <TableCell>
          <p>None</p>
        </TableCell>
      )
    }
  }
  //update state on load component
  componentDidMount() {
    axios
      .get(GLOBALS.API_ROOT + "/api/applications/programs/", {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
      .then(response => {
        response.data.results.forEach(function (app, i){
          switch (response.data.results[i].status) {
            case "SUB":
              response.data.results[i].status = "Submitted"
              break;
            case "PEN":
              response.data.results[i].status = "Pending"
              break;
            case "APP":
              response.data.results[i].status = "Approved"
              break;
            case "WAI":
              response.data.results[i].status = "Waitlisted"
              break;
            case "REJ":
              response.data.results[i].status = "Rejected"
              break;
          }
          switch(response.data.results[i].applicant_status){
            case "ACC":
              response.data.results[i].applicant_status = "Accepted"
              break;
            case "WIT":
              response.data.results[i].applicant_status = "Withdrawn"
              break;
            case "PEN":
              response.data.results[i].applicant_status = "Pending"
              break;
          }
        })
        this.setState({ applications: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    let scrollTop = window.scrollY;
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
                    <TableCell padding="none" size="medium">School</TableCell>
                    <TableCell padding="none" size="medium">Program</TableCell>
                    <TableCell padding="none" size="medium">Date</TableCell>
                    <TableCell padding="none" size="medium">Status</TableCell>
                    <TableCell padding="none" size="medium">Applicant Action</TableCell>
                    <TableCell padding="none" size="medium">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.applications.map(row => (
                    <TableRow key={row.uid}>
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
                        {row.status}
                      </TableCell>
                      <TableCell padding="none" size="medium">
                        {row.applicant_status}
                      </TableCell>
                      {this.renderActions(row)}
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
