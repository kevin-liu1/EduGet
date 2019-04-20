import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditEducation from './EditEducation'
import axios from 'axios';
import GLOBALS from "../../config/common";
import '../../styles/App.css';

class Education extends Component {
  constructor(props){
    super(props);
    this.state={
        educationlevel: "",
        school: "",
        grade: ""
    }
  }

  componentDidMount(){
    console.log("hello")

    axios.get(
      GLOBALS.API_ROOT + "/api/users/details/",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.setState(
        {
          educationlevel: response.data.education_level,
          grade: response.data.grade,
          school: response.data.school
        }
      )
    })
    .catch((error) => {
     console.log(error);
   });
  }
  
  componentWillReceiveProps(prop){
    if (prop.user.educationlevel){
      this.setState({
        educationlevel: prop.user.educationlevel
      })
    }
    if (prop.user.grade){
      this.setState({
        grade: prop.user.grade
      })
    }
    if (prop.user.school){
      this.setState({
        school: prop.user.school
      })
    }
  }

  render() {
    return (

      <div>
        <EditEducation/>
        <h1>Education</h1>
        <h4>Education Level</h4>
        {this.state.educationlevel}
        <h4>School</h4>
        {this.state.school}
        <h4>Grade</h4>
        {this.state.grade}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Education);
