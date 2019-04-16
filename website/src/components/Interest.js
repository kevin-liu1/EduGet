import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditEducation from './EditEducation'
import EditInterest from './EditInterest'
import axios from 'axios';
import '../styles/App.css';

class Interest extends Component {
  constructor(props){
    super(props);
    this.state={
        interest: "",
        interestopen: false
    }
  }

  componentDidMount(){
    console.log("hello")

    axios.get(
      "http://localhost:8000/api/users/details/",
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

export default (Interest);
