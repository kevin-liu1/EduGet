import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSummary from './EditSummary'
import axios from 'axios'
import '../styles/App.css';

class Summary extends Component {
  constructor(props){
    super(props);
    this.state = {
      summary: ""
    }
  }
  componentDidMount(){
    axios.get(
      "http://localhost:8000/api/users/details/",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
      this.setState(
        {
          summary: response.data.summary
        }
      )

      if (this.state.educationlevel==""){
        this.setState({createProfileOpen: true})
      }
      else {
        this.setState({createProfileOpen:false})
      }

    })
    .catch((error) => {
     console.log(error);
   });

  }

  handleClose(){
    axios.put(
      "http://localhost:8000/api/users/details/",
      {
        education_level: this.state.educationlevel,
        grade: this.state.grade,
        school: this.state.school

      },
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") }
      })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
     console.log(error);
   });
  }

  componentWillReceiveProps(prop){
    if (prop.user.summary){
      this.setState({summary: prop.user.summary})
    }
  }

  render() {
    return (
      <div>
        <EditSummary/>
          <h1>Summary</h1>
            <p>
              {this.state.summary}
            </p>
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
