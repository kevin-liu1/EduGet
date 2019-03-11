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

  handleClose(e){
    this.setState({
      educationlevel:"",
      grade:null,
      school:"",
      educationOpen: false
    })
  }
  handleSave(e){
    e.preventDefault();
    this.props.editEducation(this.state.educationlevel, this.state.grade, this.state.school);
    this.setState({
      educationlevel:"",
      grade:null,
      school:"",
      educationOpen: false
      }
    )
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
            <IconButton color="inherit" aria-label="Close" className="closeEdit">
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
