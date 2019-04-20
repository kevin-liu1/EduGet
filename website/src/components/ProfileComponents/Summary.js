import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSummary from './EditSummary'
import axios from 'axios'
import '../../styles/App.css';
import GLOBALS from "../../config/common";

class Summary extends Component {
  constructor(props){
    super(props);
    this.state = {
      summary: ""
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
          summary: response.data.summary
        }
      )
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
