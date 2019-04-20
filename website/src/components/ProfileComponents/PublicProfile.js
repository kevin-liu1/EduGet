import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from '../Header';
import Scrollspy from 'react-scrollspy';
import Grid from '@material-ui/core/Grid';
import profilepic from '../../assets/profilepic.png'
import axios from 'axios'
import GLOBALS from "../../config/common";
import '../../styles/App.css'

class PublicProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      openeditprofile: 1,
      summary: "",
      education: "",
      school: "",
      grade: "",
      interest: "",
      firstname: "",
      lastname: "",
      interest: "",
      email: "",
      transcript: "",
      profile_pic: null,
    }

  }
  componentDidMount(){
    const { match } = this.props;
    const id = match.params.uid;
    axios.get(
      GLOBALS.API_ROOT + "/api/users/details/"+id+"/",
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
          lastname: response.data.last_name,
          interest: response.data.interest,
          school: response.data.school,
          grade: response.data.grade,
          email: response.data.email,
          transcript: response.data.transcript,
          profile_pic: response.data.profilepic
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
                <img 
                  className="profilePicture" 
                  src={this.state.profile_pic == null ? profilepic : this.state.profile_pic} 
                  alt="profilepic"
                />
                <h3>{this.state.firstname} {this.state.lastname}</h3>
                <p><b>Email:</b> {this.state.email}</p>
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
                  <li>
                    <a href="#documents"><h4>Transcript</h4></a>
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
                      <h1>Summary</h1>
                        <p>
                          {this.state.summary}
                        </p>
                  </div>
                  </section>
                  <section id="education" className="editSection">
                  <div>
                  <div>

                    <h1>Education</h1>
                    <h4>Education Level</h4>
                    {this.state.education}
                    <h4>School</h4>
                    {this.state.school}
                    <h4>Grade</h4>
                    {this.state.grade}
                  </div>

                  </div>
                  </section>

                  <section id="interest" className="editSection">
                    <h1>Interests</h1>
                    {this.state.interest}
                  </section>
                  <section id="documents" className="editSection">
                  <h2>Transcript</h2>
                    {this.state.transcript != null ? <a href={this.state.transcript}>View Transcript</a> :
                      <p></p>
                    }
                  </section>
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

export default PublicProfile;
