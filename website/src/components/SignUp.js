import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
  }

  render() {
    return (
      <div>
        <Card className="signUpCard" >
          <CardContent>
            <Typography variant="h5">Sign Up</Typography>
            <form>
              <div className="signUpSpacing">
                <TextField label="First Name" fullWidth onChange={(event)=>this.setState({firstName:event.target.value})}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="Last Name" fullWidth onChange={(event)=>this.setState({lastName:event.target.value})}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="E-mail" fullWidth onChange={(event)=>this.setState({email:event.target.value})}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="Password" type="password" fullWidth onChange={(event)=>this.setState({initPassword:event.target.value})}/>
              </div>
              <div className="signUpSpacing">
                <TextField label="Re-type Password" type="password" error={!(this.state.initPassword === this.state.password)} fullWidth onChange={(event)=>this.setState({password:event.target.value})}/>
              </div>
              <div className="signUpSpacing">
                <p>By clicking Join now, you agree to Wise Turn's <a href="useragreement">User Agreement</a></p>
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
