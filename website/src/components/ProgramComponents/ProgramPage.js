import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../../styles/School.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ReactMapGL, { Marker } from "react-map-gl";
import Icon from "@material-ui/core/Icon";
import GLOBALS from "../../config/common";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProgramPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      marginTop: 0,
      viewport: {},
      open: false
    };
  }

  submitApplication(id) {
    axios
      .post(
        GLOBALS.API_ROOT + "/api/applications/programs/create/",
        {
          program: id
        },
        {
          headers: { Authorization: "Token " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({ open: true });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.uid;
    axios
      .get(GLOBALS.API_ROOT + "/api/programs/" + id, {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          info: response.data
        });
        this.setState({
          viewport: {
            width: "100%",
            height: 400,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            zoom: 12
          }
        });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Header />
        <div className="body-wrapper">
          <Grid
            container
            spacing={24}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <SideBar info={this.state.info} />
            <Grid item xs={12} md={9} className="school-desc">
              <Card>
                <CardContent>
                  <h1>About</h1>
                  <div style={{ marginBottom: "20px" }}
                    dangerouslySetInnerHTML={{
                      __html: this.state.info.description
                    }}
                  />
                  {this.state.info.average_applicant_grade ?
                    <p><b>Average Grade: </b> {this.state.info.average_applicant_grade} %</p> :
                    <div></div>
                  }
                  <p><b>Application Fee: </b> ${this.state.info.application_fee} (CAD) </p>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ float: "right", marginBottom: "20px", backgroundColor: "#4384AB" }}
                    onClick={e => this.submitApplication(this.state.info.uid, e)}
                  >Apply</Button>

                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={this.state.open}
            onClose={this.handleClose}
            message={
              <span id="message-id">Application Submitted Successfully</span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </div>
    );
  }
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginTop: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll() {
    let scrollTop = window.scrollY;
    this.setState({
      marginTop: scrollTop + "px"
    });
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <Grid
        item
        xs={9}
        md={3}
        className="school-info"
        style={{ marginTop: this.state.marginTop }}
      >
        <Card>
          <CardContent>
            {this.props.info.name ? (
              <div>
                <img src={this.props.info.institution.logo} alt="profilepic" />
                <h3>
                  {this.props.info.name}
                </h3>
                <Link to={"/schools/" + this.props.info.institution.uid}>{this.props.info.institution.name}</Link>
                

                {this.props.info.discipline ? (
                  <p>
                    <strong>Discipline</strong>: {this.props.info.discipline}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.level ? (
                  <p>
                    <strong>Level</strong>: {this.props.info.level}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.application_fee ? (
                  <p>
                    <strong>Application Fee</strong>: {this.props.info.application_fee}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.tuition ? (
                  <p>
                    <strong>Tuition</strong>: {this.props.info.tuition}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withRouter(ProgramPage);
