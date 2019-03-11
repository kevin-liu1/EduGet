import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditEducation from './EditEducation'
import '../styles/App.css';

class Summary extends Component {
  constructor(props){
    super(props);
    this.state={
        educationlevel: "",
        school: "",
        grade: ""
    }
  }
  componentWillReceiveProps(props){
    if (props.user.educationlevel){
        this.setState({educationlevel: props.user.educationlevel})
    }
    if (props.user.school){
        this.setState({school: props.user.school})
    }
    if (props.user.grade){
        this.setState({grade: props.user.grade})
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

export default connect(mapStateToProps)(Summary);
