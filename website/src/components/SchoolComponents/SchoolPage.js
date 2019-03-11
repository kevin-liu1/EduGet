import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../Header.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import "../../styles/School.css";
import axios from 'axios';

class SchoolPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: {}
    }
    this.renderPrograms = this.renderPrograms.bind(this)
  }

  renderPrograms(){
    console.log(this.state.info.programs)
    if (this.state.info.programs != null) {
      this.state.info.programs.map((program) => {
        console.log(program.name)
      return(
        <Grid item xl="auto">
          <Card>
            <CardContent>
              {console.log(program.name)}
              <p>{program.name}</p>
            </CardContent>
          </Card>
        </Grid>
      )
      })
    }
  }
  componentDidMount(){
    const {match} = this.props
    const id = match.params.uid
    axios.get('http://localhost:8000/api/institutions/'+id,{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log(response.data)
      this.setState({
          info: response.data
        });
    }).catch((error)=>{
      console.log(error.response.data);
    })
  }


  render() {
    return (
      <div>
        <Header/>
        <div className="school-container">
          <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
            <Grid item xl="auto" className="school-info">
              <Card>
              <CardContent>
                <img src={this.state.info.logo} alt="profilepic"/>
                <h3>{this.state.info.name}</h3>
                <h6>Founded in {this.state.info.founded}</h6>
                <h6>{this.state.info.location}</h6>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9} className="school-desc">
              <Card >
              <CardContent >
                <h1>About</h1>
                {this.state.info.description}           
              </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h1>Programs</h1>
                  <Grid container spacing={24} direction="row" justify="center" align-items="flex-start">
                    {this.renderPrograms()}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(SchoolPage);
