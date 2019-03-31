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
    return(
      this.state.info.programs.map((program) => {
        return(
          <Grid item xl="auto">
            <Card>
              <CardContent>
                <h2 class="program-title"><a href={`/schools/${this.state.info.uid}/programs/${program.uid}`}>{program.name}</a><span class="program-price">${program.tuition}</span></h2>
                <p class="program-description" dangerouslySetInnerHTML={{__html: program.description}}></p>
              </CardContent>
            </Card>
          </Grid>
        )
        })
    )
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
                <h3><img src={`https://www.countryflags.io/${this.state.info.country}/flat/24.png`} /> {this.state.info.name}</h3>
                <p>Founded in {this.state.info.founded}</p>
                <p>{[this.state.info.street, this.state.info.city, this.state.info.province].join(", ")}</p>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9} className="school-desc">
              <Card >
              <CardContent >
                <h1>About</h1>
                <div dangerouslySetInnerHTML={{__html: this.state.info.description}} />
              </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h1>Programs</h1>
                  <Grid container spacing={24} direction="column" justify="center" align-items="flex-start">
                    {!this.state.info.programs ? <p>Loading.. </p> : this.renderPrograms()}
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
