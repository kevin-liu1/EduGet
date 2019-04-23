import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/info.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import GLOBALS from '../config/common';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';


class Settings extends Component {
  constructor(props){
    super(props);
    this.state={
      currentpw: "",
      newpw: "",
      newpw2: "",
      open: false,
      errormsg: ""
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOpen(){
    this.setState({open:true})
  }
  handleClose(){
    this.setState({open:false})
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(){
    if ((this.state.newpw == this.state.newpw2) && (this.state.newpw != "")){
      axios.post(GLOBALS.API_ROOT + "/api/token/auth/",{
        username: JSON.parse(localStorage.getItem("user_info")).email,
        password: this.state.currentpw
      }).then((response) => {      
        axios.put(
          GLOBALS.API_ROOT + "/api/users/details/",
          {
            password: this.state.newpw
          },
          {
            headers: { Authorization: "Token " + localStorage.getItem("token") }
          })
        .then((response) => {
          this.setState({
            currentpw: "",
            newpw: "",
            newpw2: "",
            open: false,
            errormsg: ""
          })
        })
        .catch((error) => {
        console.log(error);
        this.setState({errormsg: "Invalid Password"})
        });
      })
      .catch((error) => {
       console.log(error);
       this.setState({errormsg: "Invalid Password"})
     });
  }else{
    this.setState({errormsg: "Password doesn't match"})
  }
  }
  render() {
    return (
        <div>
          <MenuItem onClick={this.handleOpen}>Settings</MenuItem>
          <Dialog
            onClose={this.handleClose}
            open={this.state.open}
            onExiting={this.handleClose}
            fullWidth
          >
          <div className="dialog">
            <IconButton color="inherit" aria-label="Close" className="closeEdit" onClick={this.handleClose}>
                  <CloseIcon/>
            </IconButton>
            <DialogTitle>Change Password</DialogTitle>
            <Divider/>
            <DialogContent>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={this.state.currentpw}
                onChange={this.handleChange('currentpw')}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={this.state.newpw}
                onChange={this.handleChange('newpw')}
              />            
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={this.state.newpw2}
                onChange={this.handleChange('newpw2')}
              />
            {
              this.state.errormsg ? <p style={{color: 'red'}}>{this.state.errormsg}</p> : <div></div>
            }
            </DialogContent>
            <div className="editProfileButton">
              <Button variant="contained" margin='normal' size="large" color="primary" onClick={this.handleSubmit}>
              Submit
              </Button>
            </div>
          </div>
          </Dialog>
        </div>
    );
  }
}

export default Settings;
