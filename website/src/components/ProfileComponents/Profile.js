import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from '../Header';
import Scrollspy from 'react-scrollspy';
import Grid from '@material-ui/core/Grid';
import profilepic from '../../assets/profilepic.jpg'
import Summary from './Summary'
import Education from './Education'
import CreateProfile from './CreateProfile'
import Interest from './Interest'
import axios from 'axios'
import '../../styles/App.css'
import GLOBALS from "../../config/common";
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      openeditprofile: 1,
      summary:"",
      educationlevel:"",
      interestField:"",
      firstname:"",
      lastname:"",
      phone: "",
      city: "",
      age: "",
      grade: "",
      school: "",
      email: ""
    }

  }
  componentDidMount(){
    axios.get(
      GLOBALS.API_ROOT + "/api/users/details/",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.setState(
        {
          summary: response.data.summary,
          educationlevel: response.data.education_level,
          interestField: response.data.interest,
          firstname: response.data.first_name,
          lastname: response.data.last_name,
          email: response.data.email
        }
      )

    })
    .catch((error) => {
     console.log(error);
   });
  }

  componentWillReceiveProps(prop){
    this.setState(prop.user)
  }
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <div className="body-wrapper">
          <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
            <Grid item xs={3}>
              <Card className="profile">
              <CardContent className="profileInfo">
                <img className="profilePicture" src={profilepic} alt="profilepic"/>
                <h3>{this.state.firstname} {this.state.lastname}</h3>
                <p><b>Email:</b> {this.state.email}</p>
                <Divider/>
                <Scrollspy items={ ['summary', 'education', 'interest'] } currentClassName="is-current">
                  <li>
                    <a href="#summary"><h4>Summary</h4></a>
                  </li>
                  <li>
                    <a href="#education"><h4>Education</h4></a>
                  </li>
                  <li>
                    <a href="#interest"><h4>Interest</h4></a>
                  </li>
                </Scrollspy>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <Card >
              <CardContent className="profileContent">
                <div>
                  <div>
                    <CreateProfile/>
                  </div>
                  <section id="summary" className="editSection">
                  <div>
                      <Summary/>
                  </div>
                  </section>
                  <section id="education" className="editSection">
                  <div>
                      <Education/>

                  </div>
                  </section>

                  <section id="interest" className="editSection">
                      <Interest/>
                  </section>
                  <br/>
                  <br/>
                  <input
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{display: 'none'}}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                      Upload Documents
                    </Button>
                  </label>
              </div>
              </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile);
