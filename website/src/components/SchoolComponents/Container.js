import React, { Component } from 'react';
import Header from '../Header.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import "../../styles/School.css";
import axios from 'axios';
import SchoolPage from './SchoolPage.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SchoolList extends Component {
  render() {
      var school = this.props.schools_info
    return (
        <div>
        <Grid item xl="auto">
          <Card>
            <CardContent>
              <p>{school.name}</p>
            </CardContent>
          </Card>
        </Grid>
        </div>
    );
  }
}

export default SchoolList;
