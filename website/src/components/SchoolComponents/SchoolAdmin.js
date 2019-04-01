import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../Header.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Check from '@material-ui/icons/CheckCircleOutline';
import Close from '@material-ui/icons/Close';
import People from '@material-ui/icons/People';
import "../../styles/School.css";
import axios from 'axios';
import GLOBALS from '../../config/common';

const redbutton = createMuiTheme({ 
    root: {
        padding: "none"
    },
    palette: { primary: red } 
})
const bluebutton = createMuiTheme({ 
    root: {
        padding: "none"
    },
    palette: { primary: blue } 
})
const greenbutton = createMuiTheme({ 
    root :{
        padding: "none"
    },
    palette: { primary: green },
    overrides: {
        MuiButton: {
          raisedPrimary: {
            color: 'white',
          },
        },
      }
})
const tabbar = createMuiTheme({
    palette: {primary:{main:'#4384AB'}}
})

class SchoolAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: {},
      value: 0,
      applicants: [
          {
              id: 1,
              name: "James Militante",
              program: "Bachelor of Applied Science, Honours Computer Science",
              date: "April 1, 2019",
              status: "Pending"
          },
          {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },
        {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },
        {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },
        {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },
        {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },
        {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },
        {
            id: 1,
            name: "James",
            program: "CS",
            date: "April 1, 2019",
            status: "Pending"
        },

          
      ]
    }
    this.renderPrograms = this.renderPrograms.bind(this)
    this.handleTab = this.handleTab.bind(this);
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

  handleTab(e, value){
    this.setState({value})
  }

  componentDidMount(){
    const {match} = this.props
    const id = match.params.uid
    axios.get(GLOBALS.API_ROOT + '/api/institutions/'+id,{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log(response.data)
      this.setState({
          info: response.data
        });
    }).catch((error)=>{
      console.log(error.response.data);
    })
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    let scrollTop = window.scrollY;
    console.log(scrollTop)
    this.setState({
      marginTop: scrollTop + 'px',
    })
  }

  render() {
    const divStyle = {
        marginTop: this.state.marginTop
    };
    return (
      <div>
        <Header/>
        <div className="body-wrapper">
          <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
            <Grid item xs={12} md={3} className="school-info" style={divStyle}>
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
                <AppBar position="static" color="default">
                    <MuiThemeProvider theme={tabbar}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleTab}
                            indicatorColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Profile" />
                            <Tab label="Applications" />
                        </Tabs>
                    </MuiThemeProvider>
                </AppBar>
                {
                this.state.value == 0 && 
                <div>
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
                </div>
                }
                {
                this.state.value == 1 && 
                 <Card >
                 <CardContent >
                     <h1>Applications</h1>
                     <Table>
                         <TableHead>
                             <TableRow>
                                 <TableCell padding="none" >Program</TableCell>
                                 <TableCell padding="none" >Applicant</TableCell>
                                 <TableCell padding="none" >Date</TableCell>
                                 <TableCell padding="none" >Status</TableCell>
                                 <TableCell padding="none" >Action</TableCell>
                             </TableRow>
                         </TableHead>
                         <TableBody>
                            {this.state.applicants.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell padding="none" size="medium">{row.program}</TableCell>
                                    <TableCell padding="none" size="medium">{row.name}</TableCell>
                                    <TableCell padding="none" size="medium">{row.date}</TableCell>
                                    <TableCell padding="none" size="medium">{row.status}</TableCell>
                                    <TableCell padding="none" size="medium">
                                    <MuiThemeProvider theme={greenbutton}>
                                        <IconButton>
                                            <Check color="primary"/>
                                        </IconButton>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={bluebutton}>
                                        <IconButton>
                                                <People color="primary" />
                                        </IconButton>     
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={redbutton}>
                                        <IconButton>
                                                <Close color="primary"/>
                                        </IconButton>
                                    </MuiThemeProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                         </TableBody>
                         <TableFooter>

                         </TableFooter>
                     </Table>
                 </CardContent>
                 </Card>
                }
                </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(SchoolAdmin);
