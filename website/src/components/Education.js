import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from './Header'
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import '../styles/App.css'


//options for selection
const education = [
{
  value: 'SecondarySchool',
  label: 'Secondary School',
},
{
  value: 'UndergraduateDiploma',
  label: 'Undergraduate Diploma',
},
{
  value: 'UndergraduateDegree',
  label: 'Undergraduate Degree',
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



class Education extends Component {
  constructor(props){
    super(props);
    this.state={
      educationlevel:"",
      grade:null,
      school:""
    }
  }

  //functions for user input profile information

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { main: '#4384AB' }, // change color of AppBar
      }
    });
    return (

      <div>
        <Card>
          <IconButton color="inherit" aria-label="Close" className="closeEdit">
            <CloseIcon/>
          </IconButton>
          <CardHeader title="Edit education"/>
          <Divider />
          <CardContent>

            <MuiThemeProvider theme={theme}>

              <TextField
                id="filled-select-education"
                select
                fullWidth
                label="What is your most recent education?*"
                value={this.state.educationlevel}
                onChange={this.handleChange('educationlevel')}
                margin="normal"
                variant="outlined"
              >
                {education.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField className="signUpSpacing" label="School" autoComplete="no"
               fullWidth value={this.state.school} onChange={this.handleChange('school')}/>
               <p/>
              <TextField className="signUpSpacing" label="Grade Average" autoComplete="no"
               fullWidth value={this.state.grade} onChange={this.handleChange('grade')}/>
               <p/>
               <Divider />
               <p/>
               <div className="editProfileButton" >
                <Button variant="contained" margin='normal' size="large" color="primary">
                  Save
                </Button>
              </div>
            </MuiThemeProvider>

          </CardContent>
        </Card>

      </div>

    );
  }
}


export default Education;
