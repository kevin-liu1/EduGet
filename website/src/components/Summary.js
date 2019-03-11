import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSummary from './EditSummary'
import '../styles/App.css';

class Summary extends Component {
  constructor(props){
    super(props);
    this.state = {
      summary: ""
    }
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
