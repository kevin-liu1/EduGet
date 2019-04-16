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
import CreateProfile from './CreateProfile'
import axios from 'axios'
import '../styles/CreateProfile.css'
import '../styles/App.css'


//options for selection

class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      educationlevel:"",
      grade:null,
      school:"",
      createProfileOpen: false
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
      educationlevel:"",
      grade:null,
      school:"",
      createProfileOpen: false
    })
    window.location.reload()
  }

  handleSave(e){
    e.preventDefault();
    this.props.editEducation(this.state.educationlevel, this.state.grade, this.state.school);
    this.setState({
      educationlevel:"",
      grade:null,
      school:"",
      createProfileOpen: false
      }
    )
  }
  handleOpen(e){
    this.setState({
      createProfileOpen: true
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
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" aria-label="Edit" className="closeEdit" onClick={this.handleOpen}>
            Edit Profile
        </Button>
        <Dialog
            onClose={this.handleClose}
            open={this.state.createProfileOpen}
            onExiting={this.handleClose}
            maxWidth='xl'
        >
          <div className="popUp">
            <IconButton color="inherit" aria-label="Close" className="closeEdit" onClick={this.handleClose}>
              <CloseIcon/>
            </IconButton>

            <CreateProfile/>

          </div>
        </Dialog>
      </MuiThemeProvider>
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

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
