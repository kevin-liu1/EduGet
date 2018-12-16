import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {editProfile} from '../actions/userAction'
import '../styles/App.css'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      postCode: "",
      address: "",
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editProfile(this.state);
  }

  render() {
    return (<div>
      <Typography variant="h5">Edit Profile</Typography>
      <form>
        <Grid className="signUpSpacing" container alignItems="center" spacing={16}>
          <Grid item="item" md={6}>
            <TextField className="signUpSpacing" name="firstName" label="First Name" autoComplete="no" fullWidth onChange={this.onChange}/>
          </Grid>
          <Grid item="item" md={6}>
            <TextField className="signUpSpacing" name="lastName" label="Last Name" autoComplete="no" fullWidth onChange={this.onChange}/>
          </Grid>
          <Grid item="item" md={12}>
            <TextField className="signUpSpacing" name="email" label="E-mail" autoComplete="no" fullWidth onChange={this.onChange}/>
          </Grid>
          <Grid item="item" md={6}>
            <TextField className="signUpSpacing" name="country" label="Country" autoComplete="no" fullWidth onChange={this.onChange}/>
          </Grid>
          <Grid item="item" md={6}>
            <TextField className="signUpSpacing" name="postCode" label="Post Code" autoComplete="no" fullWidth onChange={this.onChange}/>
          </Grid>
          <Grid item="item" md={12}>
            <TextField className="signUpSpacing" name="address" label="Address" autoComplete="no" fullWidth onChange={this.onChange}/>
          </Grid>
          <Grid>
          <div onClick={this.handleSubmit}>
            <Button variant="contained" color="primary" fullWidth>Join Now</Button>
          </div>
          </Grid>
        </Grid>
    </form>
  </div>);
  }
}
const mapStateToProps = (state, props) => {
  return state;
};

const mapActionsToProps = (dispatch) => ({
  editProfile: (state) => dispatch(editProfile(state))
})

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
