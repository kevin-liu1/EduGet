import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { userProfile } from '../actions/userAction'
import '../styles/App.css'

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
    this.onSubmit = this.onSubmit.bind(this);
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
  onSubmit(e){
    e.preventDefault();
    this.props.userProfile(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <Card className="signUpCard" >
          <CardContent>
            <Typography variant="h5">Sign Up</Typography>
            <form>
              <div className="signUpSpacing">
                <TextField label="First Name" autoComplete="no" fullWidth onChange={this.onChangeFirstName}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="Last Name" autoComplete="no" fullWidth onChange={this.onChangeLastName}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="E-mail" autoComplete="no" fullWidth onChange={this.onChangeEmail}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="Password" autoComplete="no" type="password" fullWidth onChange={this.onChangeInitPassword}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="Re-type Password" autoComplete="no" type="password" error={!(this.state.initPassword === this.state.password)} fullWidth onChange={this.onChangePassword}/>
              </div>
              <div className="signUpSpacing">
                <Grid container spacing ={8} alignItems="center">
                  <Grid item>
                    <Checkbox checked={this.state.agree} onChange={this.isChecked}/>
                  </Grid>
                  <Grid item>
                    <p>I agree to the <a href="none">Terms of Service</a></p>
                  </Grid>
                </Grid>
              </div>
              <div className="signUpSpacing">
                <Button variant="contained" onClick={this.onSubmit} color="primary" fullWidth>Join Now</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  userProfile: (firstName, lastName, email, password) => dispatch(userProfile(firstName, lastName, email, password))
})

export default connect(undefined, mapActionsToProps)(SignUp);
