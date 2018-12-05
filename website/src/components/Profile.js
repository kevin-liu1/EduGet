import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      network: []
    }
  }
  render() {
    console.log(this.props.user.firstName);
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5">{this.state.firstName} {this.state.lastName}</Typography>
            <Typography variant="subheading">{this.state.email}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Summary</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Experience</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);
