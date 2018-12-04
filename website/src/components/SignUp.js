import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeFirstName(event){
    this.setState({firstName: event.target.value});
  }
  onChangeLastName(event){
    this.setState({lastName: event.target.value});
  }
  onChangeEmail(event){
    this.setState({email: event.target.value});
  }
  onChangeInitPassword(event){
    this.setState({initPassword: event.target.value});
  }
  onChangePassword(event){
    this.setState({password: event.target.value});
  }
  onSubmit(event){
    this.setState({agree: event.target.checked});
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
                    <Checkbox checked={this.state.agree} onChange={this.onSubmit}/>
                  </Grid>
                  <Grid item>
                    <p>I agree to the <a href="none">Terms of Service</a></p>
                  </Grid>
                </Grid>
              </div>
              <div className="signUpSpacing">
                <Button variant="contained" color="primary" fullWidth>Join Now</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SignUp;
