import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { editSummary } from '../../actions/userAction';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios'
import '../../styles/App.css';
import GLOBALS from "../../config/common";

class EditSummary extends Component {
  constructor(props){
    super(props);
    this.state = {
      summaryField: "",
      summaryOpen: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose(e){
    this.setState({
      summaryField: "",
      summaryOpen: false,
    })
  }

  handleChange(e){
    this.setState({summaryField: e.target.value})
  }

  handleSave(e){
    axios.put(
      GLOBALS.API_ROOT + "/api/users/details/",
      {
        summary: this.state.summaryField

      },
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.props.editSummary(this.state.summaryField);
      this.setState({
        summaryOpen: false,
        }
      )
    })
    .catch((error) => {
     console.log(error);
   });
  }

  handleOpen(e){
    this.setState({
      summaryOpen: true
    })
  }
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
            open={this.state.summaryOpen}
            onExiting={this.handleClose}
        >
        <div className="dialog">
          <Card>
            <IconButton color="inherit" aria-label="Close" className="closeEdit" onClick={this.handleClose}>
              <CloseIcon/>
            </IconButton>
            <CardHeader title="Edit Summary" />
            <Divider/>
            <MuiThemeProvider theme={theme}>
              <CardContent >
                  <TextField
                    label="Summary"
                    multiline
                    onChange={this.handleChange}
                    fullWidth
                    rows="6"
                    variant="outlined"
                  />
              </CardContent>
              <Divider/>
              <div className="editProfileButton">
                <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.handleSave}>
                  Save
                </Button>
              </div>
            </MuiThemeProvider>
          </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  editSummary: (summary, summaryOpen) => dispatch(editSummary(summary, summaryOpen))
})

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapActionsToProps)(EditSummary);
