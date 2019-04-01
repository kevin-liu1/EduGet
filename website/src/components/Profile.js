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
import '../styles/App.css'

class Profile extends Component {
  constructor(props){
    super(props);
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
                <h3>Full Name</h3>
                <Scrollspy items={ ['summary', 'education', 'experience'] } currentClassName="is-current">
                  <li>
                    <a href="#summary"><h4>Summary</h4></a>
                  </li>
                  <li>
                    <a href="#education"><h4>Education</h4></a>
                  </li>
                  <li>
                    <a href="#experience"><h4>Experience</h4></a>
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
                  <section id="experience" className="editSection">
                  <div>
                      <IconButton color="inherit" aria-label="Edit" className="editButton">
                        <EditIcon/>
                      </IconButton>
                    <h1>Experience</h1>
                  </div>
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

export default Profile;
