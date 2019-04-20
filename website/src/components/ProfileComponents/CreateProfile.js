import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import GLOBALS from '../../config/common';
import axios from 'axios';
import { editProfile, editInterest, editEducation } from '../../actions/userAction';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import '../../styles/App.css'
import '../../styles/CreateProfile.css'

//options for selection

const countries = [
  {
    value: 'USA',
    label: 'United States of America',
  },
  {
    value: 'Canada',
    label: 'Canada',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
];

const education = [
  {
    value: 'MiddleSchool',
    label: 'Middle School (Grade 6-8)'
  },
  {
    value: 'SecondarySchool',
    label: 'Secondary School (Grade 9-12) Diploma',
  },
  {
    value: 'Bachelors',
    label: "Bachelor's Degree",
  },
  {
    value: 'Masters',
    label: "Master's Degree",
  },
  {
    value: 'Doctoral',
    label: 'Doctoral Degree',
  },
  {
    value:'',
    label: "None"
  }
];

const gradingscheme = [
  {
    value: 'letter',
    label: 'Letter Grade Scale: F to A',
  },
  {
    value: 'number100',
    label: 'Number Scale: 0-100',
  },
  {
    value: 'number10',
    label: 'Number Scale: 0-10'
  }
];

class CreateProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      createProfileOpen: false,
      page: 0,
      progressbar:0,
      firstname:"",
      lastname:"",
      zippostal:"",
      phonenumber:null,
      city:"",
      countryoforigin: "",
      birthday:"",
      educationlevel:"",
      gradingscheme:"",
      grade:null,
      school:"",
      interest:"",

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
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
          firstname: response.data.first_name,
          lastname: response. data.last_name,
          educationlevel: response.data.education_level,
          grade: response.data.grade,
          school: response.data.school,
          zippostal: response.data.zippostal,
          birthday: response.data.birthday,
          countryoforigin: response.data.country_of_origin,
          city: response.data.city,
          email:response.data.email,
          interest: response.data.interest,
          phonenumber: response.data.phonenumber

        }
      )
      if (this.state.educationlevel=="" || this.state.school ==""){
        this.setState({createProfileOpen: true})
      }
      else {
        this.setState({createProfileOpen:false})
      }
    })
    .catch((error) => {
     console.log(error);
   });
  }

  handleClose(e){
    this.setState({
      createProfileOpen: false
    })
  }

  handleSave(e){
    e.preventDefault();
    this.setState({
      createProfileOpen: false
      }
    )
  }
  handleOpen(e){
    this.setState({
      createProfileOpen: true
    })
  }

  handleSubmit(e){
    e.preventDefault();
    axios.put(
      GLOBALS.API_ROOT + "/api/users/details/",
      {
        first_name:this.state.firstname,
        last_name:this.state.lastname,
        zippostal: this.state.zippostal,
        phonenumber: this.state.phonenumber,
        city: this.state.city,
        birthday: this.state.birthday,
        country_of_origin: this.state.countryoforigin,
        age: this.state.age,
        education_level: this.state.educationlevel,
        grade: this.state.grade,
        interest: this.state.interest,
        school: this.state.school
      },
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.setState({
        createProfileOpen: false
      })
      this.props.editProfile(this.state.firstname, this.state.lastname, this.state.phonenumber,
        this.state.city, this.state.countryoforigin, this.state.age)
      this.props.editInterest(this.state.interest)
      this.props.editEducation(this.state.educationlevel, this.state.grade, this.state.school)
    })
    .catch((error) => {
     console.log(error);
   });
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
  handleDateChange = date => {
    this.setState({ selectedDate: date });
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
        case 0:
          return(
            <div>

            <MuiThemeProvider theme={theme}>
              <p>Fill out your information so we can find the best matches for you!</p>
              <TextField
                id="filled-select-country"
                select
                fullWidth
                label="Please Select your country*"
                value={this.state.countryoforigin}
                onChange={this.handleChange('countryoforigin')}
                margin="normal"
                variant="outlined"
              >
                {countries.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <p/>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.nextStep}>
                  Next
                </Button>
              </Grid>
            </MuiThemeProvider>
            </div>
          )
        case 1:
          return(
            <div>

            <p>Fill out your information so we can find the best matches for you!</p>
            <MuiThemeProvider theme={theme}>
            <form>

            <TextField className="profileSpacing" label="First Name" autoComplete="no"
              fullWidth value={this.state.firstname} required onChange={this.handleChange('firstname')}/>

            <TextField className="profileSpacing" label="Last Name" autoComplete="no"
              fullWidth value={this.state.lastname} onChange={this.handleChange('lastname')}/>

            <TextField className="profileSpacing" label="Phone Number" autoComplete="no"
              fullWidth value={this.state.phonenumber} onChange={this.handleChange('phonenumber')}/>

            <TextField className="profileSpacing" label="Email" autoComplete="no"
              fullWidth value={this.state.email} onChange={this.handleChange('email')}/>

            <TextField className="profileSpacing" label="Zip/Postal Code" autoComplete="no"
              fullWidth value={this.state.zippostal} onChange={this.handleChange('zippostal')}/>

             <TextField className="profileSpacing" label="Birthday" autoComplete="no"
            fullWidth value={this.state.age} type="date" InputLabelProps={{ shrink: true }} margin="normal" onChange={this.handleChange('birthday')}/>
            </form>
            <p/>

            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.previousStep}>
                Previous
              </Button>
              <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.nextStep}>
                Next
              </Button>
            </Grid>

            </MuiThemeProvider>
            </div>
          )

        case 2:
          return(
            <div>
              <MuiThemeProvider theme={theme}>
              <p/>
              <header>Fill Out Your Education</header>
              <form>

                <TextField
                  id="filled-select-education"
                  select
                  fullWidth
                  label="What is your most recent Education?"
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

                <TextField
                  id="filled-select-gradescheme"
                  select
                  fullWidth
                  label="Grading Scheme"
                  value={this.state.gradingscheme}
                  onChange={this.handleChange('gradingscheme')}
                  margin="normal"
                  variant="outlined"
                >
                  {gradingscheme.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField className="profileSpacing" label="School" autoComplete="no"
                 fullWidth value={this.state.school} onChange={this.handleChange('school')}/>

                <TextField className="profileSpacing" label="Grade Average" autoComplete="no"
                 fullWidth value={this.state.grade} onChange={this.handleChange('grade')}/>

                <Grid className="signUpSpacing" container spacing ={8} alignItems="center">
                  <Grid item>
                  <p> </p>
                  </Grid>
                </Grid>
              </form>

              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.previousStep}>
                  Previous
                </Button>
                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.nextStep}>
                  Next
                </Button>
              </Grid>


              </MuiThemeProvider>
            </div>
          )

        case 3:
          return(
            <MuiThemeProvider theme={theme}>
            <div>
              <p>Just one last step</p>
              <TextField className="profileSpacing" label="What field are you interested in" autoComplete="no"
               fullWidth value={this.state.interest} onChange={this.handleChange('interest')}/>
               <p/>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                  <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.previousStep}>
                    Previous
                  </Button>
                  <Button variant="contained" margin='normal' size="large" color="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                  </Button>


              </Grid>
            </div>
            </MuiThemeProvider>
          )
      }
    }
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Button variant="contained" color="primary" aria-label="Edit" className="closeEdit" onClick={this.handleOpen}>
              Edit Profile
          </Button>
        </MuiThemeProvider>
        <Dialog
            onClose={this.handleClose}
            open={this.state.createProfileOpen}
            onExiting={this.handleClose}
            maxWidth='xl'
            fullWidth
        >
        <div className='profileCreation'>
          <p/>
          <Card>
            <IconButton color="inherit" aria-label="Close" className="closeEdit" onClick={this.handleClose}>
              <CloseIcon/>
            </IconButton>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                  Edit Your Profile
              </Typography>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <p>Start</p>
                </Grid>
                <Grid item>
                  <p>General Info</p>
                </Grid>
                <Grid item>
                  <p>Education</p>
                </Grid>
                <Grid item>
                  <p>Finish</p>
                </Grid>
              </Grid>
              <MuiThemeProvider theme={theme}>
                <LinearProgress variant="determinate" color="primary" value={this.state.page*33.33}/>
                <LinearProgress variant="determinate" color="primary" value={this.state.page*33.33}/>
              </MuiThemeProvider>
              {renderMsg()}
            </CardContent>
          </Card>
        </div>
      </Dialog>
    </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  editProfile: (firstname, lastname, phonenumber, city, country, age) => 
  dispatch(editProfile(firstname, lastname, phonenumber, city, country, age)),
  editInterest: (interestField) => dispatch(editInterest(interestField)),
  editEducation: (educationlevel, grade, school) => dispatch(editEducation(educationlevel, grade, school))
})

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateProfile);
