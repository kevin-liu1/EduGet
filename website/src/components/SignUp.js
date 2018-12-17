import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions/userAction'
import '../styles/App.css'
import axios from 'axios';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: "",
      lastName: "",
      email: "",
      initPassword: "",
      password: "",
      agree: false
    }
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeInitPassword = this.onChangeInitPassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeFirstName(e){
    this.setState({firstName: e.target.value});
  }
  onChangeLastName(e){
    this.setState({lastName: e.target.value});
  }
  onChangeEmail(e){
    this.setState({email: e.target.value});
  }
  onChangeInitPassword(e){
    this.setState({initPassword: e.target.value});
  }
  onChangePassword(e){
    this.setState({password: e.target.value});
  }
  isChecked(e){
    this.setState({agree: e.target.checked});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password);

    axios.post('http://localhost:8000/api/users/create/', {
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password
    }).then(function (response) {
   console.log(response);
    })
    .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div>
        <Card className="signUpCard" >
          <CardContent>
            <Typography variant="h5">Register</Typography>
            <form>
              <TextField className="signUpSpacing" label="First Name" autoComplete="no" fullWidth onChange={this.onChangeFirstName}/>
              <TextField className="signUpSpacing" label="Last Name" autoComplete="no" fullWidth onChange={this.onChangeLastName}/>
              <TextField className="signUpSpacing" label="E-mail" autoComplete="no" fullWidth onChange={this.onChangeEmail}/>
              <TextField className="signUpSpacing" label="Password" autoComplete="no" type="password" fullWidth onChange={this.onChangeInitPassword}/>
              <TextField className="signUpSpacing" label="Re-type Password" autoComplete="no" type="password" error={!(this.state.initPassword === this.state.password)} fullWidth onChange={this.onChangePassword}/>
              <Grid className="signUpSpacing" container spacing ={8} alignItems="center">
                <Grid item>
                  <Checkbox checked={this.state.agree} onChange={this.isChecked}/>
                </Grid>
                <Grid item>
                  <p>I agree to the <Link to="/user-agreement">Terms of Service</Link></p>
                </Grid>
              </Grid>
              <div onClick={this.handleSubmit}>
                <Button component={Link} to="/profile" variant="contained" color="primary" fullWidth>Join Now</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  signUp: (firstName, lastName, email, password) => dispatch(signUp(firstName, lastName, email, password))
})

export default connect(undefined, mapActionsToProps)(SignUp);
