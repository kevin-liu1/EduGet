import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/info.css'
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const getApplications = ([
  {name: "McMaster University", status: "Accepted"},
  {name: "University of Waterloo", status: "Processing"},
  {name: "University of Toronto", status: "Declined"}])

/*
const CustomTableCell = withStyles(theme => ({
head: {
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
},
body: {
  fontSize: 14,
},
}))(TableCell);
*/

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

];

class MyApplications extends Component {
  constructor(props){
    super(props);
    this.state = {
      applications: []
    }

    this.currentapplications = this.currentapplications.bind(this);
  }



  //update state on load component
  componentDidMount(){
    axios.get('http://localhost:8000/api/institution-admin/applications/',{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log(response.data)
      this.setState({applications: response.data.results});
      console.log(this.state.applications)
    }).catch((error)=>{
      console.log(error);
    })
  }

  currentapplications(){

  }

  render() {
    return (
      <div id="Page">

              <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                      <Table>
                          <TableHead>
                              <TableRow>

                                  <TableCell>Applications</TableCell>
                                  <TableCell align="right">Calories</TableCell>
                                  <TableCell align="right">Fat (g)</TableCell>
                                  <TableCell align="right">Carbs (g)</TableCell>
                                  <TableCell align="right">Protein (g)</TableCell>
                              </TableRow>
                          </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                  <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                  </TableRow>
                                ))}
                          </TableBody>
                      </Table>
                  </Grid>
              </Grid>
      </div>
      );
      }
  }
export default MyApplications;
