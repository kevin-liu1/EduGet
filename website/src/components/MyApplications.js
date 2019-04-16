import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import "../styles/School.css";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import GLOBALS from '../config/common';

class MyApplications extends Component {
  constructor(props){
    super(props);
    this.state = {
      applications: []
    }
    this.handleScroll = this.handleScroll.bind();
  }

  showChoices(choices){
      switch (choices) {
        case 'SUB':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
        case 'PEN':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
        case 'APP':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
        case 'WAI':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
        case 'REJ':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
        case 'WIT':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
        case 'ACC':
            return (<TableCell padding="none" size="medium">Accept</TableCell>);
            break;
    }

  }

  //update state on load component
  componentDidMount(){
    const {match} = this.props
    const id = match.params.uid
    axios.get(GLOBALS.API_ROOT + '/api/institution-adminc/applications/',{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      this.setState({applications: response.data.results});
    }).catch((error)=>{
      console.log(error);
    })
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    let scrollTop = window.scrollY;
    console.log(scrollTop);
    this.setState({
      marginTop: scrollTop + 'px',
    })
  }

  render() {
    return (
    <div>
        <Header/>
          <div className="body-wrapper">

                  <Grid container direction="column" justify="center" alignItems="center">
                      <Grid item>
                          <Table>
                              <TableHead>
                                  <TableRow>
                                      <TableCell>Applications</TableCell>
                                      <TableCell align="right">Status</TableCell>
                                      <TableCell align="right">Status</TableCell>
                                      <TableCell align="right">Actions</TableCell>

                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {this.state.applications.map(row => (
                                      <TableRow key={row.id}>
                                          <TableCell padding="none" size="medium">{row.program.name}</TableCell>
                                          <TableCell padding="none" size="medium">{(row.date).substring(0, 10)}</TableCell> //yyyy-mm-dd
                                          <TableCell padding="none" size="medium">{row.status}</TableCell>
                                          showChoices(row.status);
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </Grid>
                  </Grid>
          </div>
      </div>
      );
      }
  }
export default MyApplications;
