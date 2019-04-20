import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditInterest from './EditInterest'
import axios from 'axios';
import GLOBALS from "../../config/common";
import '../../styles/App.css';

class Interest extends Component {
  constructor(props){
    super(props);
    this.state={
        interest: "",
    }
  }

  componentDidMount(){
    axios.get(
      GLOBALS.API_ROOT + "/api/users/details/",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.setState(
        {
          interest: response.data.interest,
        }
      )
    })
    .catch((error) => {
     console.log(error);
   });
  }

  componentWillReceiveProps(prop){
    console.log(prop.user.interestField)
    if(prop.user.interestField){
      this.setState({interest: prop.user.interestField})
    }
  }
  render() {
    return (
      <div>
        <EditInterest/>
        <h1>Interests</h1>
        {this.state.interest}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Interest);
