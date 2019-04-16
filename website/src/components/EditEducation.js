import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { editEducation } from '../actions/userAction';
import axios from 'axios'
import '../styles/App.css'


//options for selection
const education = [
  {
    value: 'Middle School (Grade 6-8)',
    label: 'Middle School (Grade 6-8)'
  },
  {
    value: 'Secondary School (Grade 9-12) Diploma',
    label: 'Secondary School (Grade 9-12) Diploma',
  },
  {
    value: "Bachelor's Degree",
    label: "Bachelor's Degree",
  },
  {
    value: "Master's Degree",
    label: "Master's Degree",
  },
  {
    value: 'Doctoral Degree',
    label: 'Doctoral Degree',
  },
  {
    value:'',
    label: "None"
  }
];



class EditEducation extends Component {
  constructor(props){
    super(props);
    this.state={
      educationlevel:"",
      grade:null,
      school:"",
      educationOpen: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  //functions for user input profile information
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
          educationlevel: response.data.education_level,
          grade: response.data.grade,
          school: response.data.school
        }
      )
    })
    .catch((error) => {
     console.log(error);
   });
  }

  handleClose(e){
    this.setState({
      educationOpen: false
    })
  }
  handleSave(e){
    e.preventDefault();
    this.props.editEducation(this.state.educationlevel, this.state.grade, this.state.school);

      axios.put(
        "http://localhost:8000/api/users/details/",
        {
          education_level: this.state.educationlevel,
          grade: this.state.grade,
          school: this.state.school

        },
        {
          headers: { Authorization: "Token " + localStorage.getItem("token") }
        })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
       console.log(error);
     });

     window.location.reload()

  }

  handleOpen(e){
    this.setState({
      educationOpen: true
    })
  }
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
        <IconButton color="inherit" aria-label="Edit" className="editButton" onClick={this.handleOpen}>
            <EditIcon/>
        </IconButton>
        <Dialog
            onClose={this.handleClose}
            open={this.state.educationOpen}
            onExiting={this.handleClose}
        >
        <div className="dialog">
          <Card>
            <IconButton color="inherit" aria-label="Close" className="closeEdit" onClick={this.handleClose}>
              <CloseIcon/>
            </IconButton>
            <CardHeader title="Edit Education"/>
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
                  <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.handleSave}>
                    Save
                  </Button>
                </div>
              </MuiThemeProvider>

            </CardContent>
          </Card>
        </div>
        </Dialog>
      </div>

    );
  }
}


const mapActionsToProps = (dispatch) => ({
  editEducation: (educationlevel, grade, school) => dispatch(editEducation(educationlevel, grade, school))
})

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapActionsToProps)(EditEducation);
