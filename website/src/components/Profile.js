import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from './Header';
import Scrollspy from 'react-scrollspy';
import Grid from '@material-ui/core/Grid';
import profilepic from '../assets/profilepic.jpg'
import Summary from './Summary'
import Education from './Education'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditProfile from './EditProfile'
import Interest from './Interest'
import axios from 'axios'
import '../styles/App.css'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      openeditprofile: 1,
      summary:"",
      education:"",
      interest:"",
      firstname:"",
      lastname:""
    }

  }
  componentDidMount(){
    axios.get(
      "http://localhost:8000/api/users/details/",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.setState(
        {
          summary: response.data.summary,
          education: response.data.education_level,
          interest: response.data.interest,
          firstname: response.data.first_name,
          lastname: response.data.last_name
        }
      )

    })
    .catch((error) => {
     console.log(error);
   });
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
                <Scrollspy items={ ['summary', 'education', 'interest'] } currentClassName="is-current">
                  <li>
                    <a href="#summary"><h4>Summary</h4></a>
                    {this.state.summary}
                  </li>
                  <li>
                    <a href="#education"><h4>Education</h4></a>
                    {this.state.education}
                  </li>
                  <li>
                    <a href="#interest"><h4>Interest</h4></a>
                    {this.state.interest}
                  </li>
                </Scrollspy>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <Card >
              <CardContent className="profileContent">
                <div>

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
                  <div>

                      <EditProfile/>

                  </div>
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

export default Profile;
