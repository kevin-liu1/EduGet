import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../styles/App.css'

//options for selection

const countries = [
{
  value: 'USD',
  label: 'United States of America',
},
{
  value: 'CAD',
  label: 'Canada',
},
{
  value: 'IND',
  label: 'India',
},
{
  value: 'JPY',
  label: 'Japan',
},
];

const education = [
{
  value: 'SecondarySchool',
  label: 'Secondary school',
},
{
  value: 'Undergraduate',
  label: 'Undergraduate',
},
{
  value: 'Masters',
  label: 'Masters',
},
{
  value: 'PhD',
  label: 'PhD',
},
];



class CreateProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      page: 1,
      progressbar:0,
      countryoforigin: "",
      educationlevel:"",
      grade:0

    }
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
  }

//functions for navigation of pages
  nextStep(){
    var val = this.state.page+1
    this.setState({page: val});
  }

  previousStep(){
    var val = this.state.page-1
    this.setState({page: val})
  }

  //functions for user input profile information

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onChangeCOI(e){
    this.setState({countryoforigin: e.target.value})
  }

  onChangeEducation(){
    this.setState({})
  }




  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });

    var renderMsg = () => {
      switch(this.state.page){
        case 1:
          return(
            <div>

            <p>Fill out your information so we can find the best matches for you!</p>
            <MuiThemeProvider theme={theme}>
              <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.nextStep}>
                Next
              </Button>
            </MuiThemeProvider>
            </div>
          )
        case 2:
          return(
            <div>
              <MuiThemeProvider theme={theme}>
              <form>

                <TextField
                  id="filled-select-country"
                  select
                  fullWidth
                  label="Country"
                  value={this.state.countryoforigin}
                  onChange={this.handleChange('countryoforigin')}
                  helperText="Please select your Country*"
                  margin="normal"
                  variant="outlined"
                >
                  {countries.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="filled-select-education"
                  select
                  fullWidth
                  label="Education"
                  value={this.state.educationlevel}
                  onChange={this.handleChange('educationlevel')}
                  helperText="What is your most recent Education*"
                  margin="normal"
                  variant="outlined"
                >
                  {education.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField className="signUpSpacing" label="Grade Average" autoComplete="no"
                 fullWidth value={this.state.grade} onChange={this.handleChange('grade')}/>


                <Grid className="signUpSpacing" container spacing ={8} alignItems="center">
                  <Grid item>
                  <p> </p>
                  </Grid>
                </Grid>
              </form>

                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.previousStep}>
                  Previous
                </Button>
                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.nextStep}>
                  Next
                </Button>
              </MuiThemeProvider>
            </div>
)
        case 3:
          return(
            <div>

              <p></p>
              <MuiThemeProvider theme={theme}>
                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.previousStep}>
                  Previous
                </Button>
              </MuiThemeProvider>
            </div>
          )
      }
    }
    return (
      <div className='signUpCard'>
        <Card>
          <CardContent>
            <header>Make your Profile</header>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <p>Step 1</p>
              </Grid>
              <Grid item>
                <p> Step 2 </p>
              </Grid>
              <Grid item>
                <p> Step 3 </p>
              </Grid>
            </Grid>
            <MuiThemeProvider theme={theme}>
              <LinearProgress variant="determinate" color="primary" value={this.state.page*25}/>
            </MuiThemeProvider>
            {renderMsg()}

          </CardContent>
        </Card>

      </div>
    );
  }
}


export default CreateProfile;
