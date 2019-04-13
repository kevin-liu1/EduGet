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
import ReactMapGL, {Marker} from 'react-map-gl';
import Icon from '@material-ui/core/Icon';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
      viewport: {},
      applicants: []
    }
    this.renderPrograms = this.renderPrograms.bind(this)
    this.handleTab = this.handleTab.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleWaitlist = this.handleWaitlist.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }
  renderPrograms(){
    return(
      this.state.info.programs.map((program) => {
        return(
        <ExpansionPanel key={program.uid}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h2 className="program-title">
              {program.name}
              <span className="program-price">${program.tuition}</span>
            </h2>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid direction="column" container>
              <p
                className="program-description"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
      this.setState({
        viewport : {
        width: "100%",
        height: 400,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        zoom: 12
        }
      })
    }).catch((error)=>{
      console.log(error.response);
    })
    axios.get(GLOBALS.API_ROOT + '/api/institution-admin/applications',{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log(response.data.results)
      this.setState({applicants: response.data.results})
    }).catch((error) => {
      console.log(error.response)
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

  handleAccept(id){
    console.log("Accept")
    axios.put(GLOBALS.API_ROOT + '/api/applications/programs/'+id,{
      status: 'APP'
    },{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log("Applicant was accepted")
    }).catch((error)=>{
      console.log(error.response.data);
    })
    console.log(id)
  }

  handleWaitlist(id){
    axios.put(GLOBALS.API_ROOT + '/api/applications/programs/'+id,{
      status: "WAI"
    },{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log("Applicant is placed on waitlist")
    }).catch((error)=>{
      console.log(error.response.data);
    })
    console.log(id)
  }

  handleReject(id){
    console.log("Reject")
    axios.put(GLOBALS.API_ROOT + '/api/applications/programs/'+id,{
      status: "REJ"
    },{
      headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
    }).then((response) => {
      console.log("Applicant was rejected")
    }).catch((error)=>{
      console.log(error.response.data);
    })
    console.log(id)
  }

  render() {
    const divStyle = {
        marginTop: this.state.marginTop
    };
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <Header/>
        <div className="body-wrapper">
          <Grid container spacing={24} direction="row" justify="center" alignItems="flex-start">
            <SideBar info={this.state.info} />
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
                    <h2>Location</h2>
                    {!this.state.info.name ? <p>Loading.. </p> :
                    <ReactMapGL mapStyle='mapbox://styles/iceandele/cjtytiw8800st1fl2215j3pku' mapboxApiAccessToken={"pk.eyJ1IjoiaWNlYW5kZWxlIiwiYSI6ImNqb2F1dXFoazF3Ynozdm5sZDBtcW1xbnQifQ.MvnPlcX-tgVTqx-Vd-is-w"}
                      {...this.state.viewport}
                      onViewportChange={(viewport) => this.setState({viewport})}>
                      <Marker latitude={this.state.info.latitude} longitude={this.state.info.longitude} offsetLeft={-20} offsetTop={-10}>
                      <Icon className="material-icons" color="primary" style={{color: "#4384AB"}}>
                        school
                      </Icon>
                      </Marker>
                    </ReactMapGL>
                    }
                    <h2>Programs</h2>
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
                                        <IconButton onClick={() => this.handleAccept(row.id)}>
                                            <Check color="primary"/>
                                        </IconButton>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={bluebutton}>
                                        <IconButton onClick={() => this.handleWaitlist(row.id)}>
                                                <People color="primary" />
                                        </IconButton>     
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={redbutton}>
                                        <IconButton onClick={() => this.handleReject(row.id)}>
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

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginTop: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll() {
    let scrollTop = window.scrollY;
    this.setState({
      marginTop: scrollTop + "px"
    });
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <Grid
        item
        xs={9}
        md={3}
        className="school-info"
        style={{ marginTop: this.state.marginTop }}
      >
        <Card>
          <CardContent>
            {this.props.info.name ? (
              <div>
                <img src={this.props.info.logo} alt="profilepic" />
                <h3>
                  <img
                    alt={this.props.info.country}
                    src={`https://www.countryflags.io/${
                      this.props.info.country
                    }/flat/24.png`}
                  />{" "}
                  {this.props.info.name}
                </h3>
                <p>Founded in {this.props.info.founded}</p>
                <p>
                  {[
                    this.props.info.street,
                    this.props.info.city,
                    this.props.info.province
                  ].join(", ")}
                </p>
                {this.props.info.dli_number ? (
                  <p>
                    <strong>DLI Number</strong>: {this.props.info.dli_number}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.cost_of_living ? (
                  <p>
                    <strong>Cost of Living</strong>:{" "}
                    {this.props.info.cost_of_living}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.scores_overall_rank ? (
                  <p>
                    <strong>Ranking (Overall)</strong>:{" "}
                    {this.props.info.scores_overall_rank}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.scores_teaching_rank ? (
                  <p>
                    <strong>Ranking (Teaching)</strong>:{" "}
                    {this.props.info.scores_teaching_rank}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.scores_research_rank ? (
                  <p>
                    <strong>Ranking (Research)</strong>:{" "}
                    {this.props.info.scores_research_rank}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.scores_citations_rank ? (
                  <p>
                    <strong>Ranking (Citations)</strong>:{" "}
                    {this.props.info.scores_citations_rank}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.scores_industry_income_rank ? (
                  <p>
                    <strong>Ranking (Industry)</strong>:{" "}
                    {this.props.info.scores_industry_income_rank}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.scores_international_outlook_rank ? (
                  <p>
                    <strong>Ranking (International Outlook)</strong>:{" "}
                    {this.props.info.scores_international_outlook_rank}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.stats_number_students ? (
                  <p>
                    <strong>Number of Students</strong>:{" "}
                    {this.props.info.stats_number_students}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.stats_student_staff_ratio ? (
                  <p>
                    <strong>Student Staff Ratio</strong>:{" "}
                    {this.props.info.stats_student_staff_ratio}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.stats_pc_intl_students ? (
                  <p>
                    <strong>% International Students</strong>:{" "}
                    {this.props.info.stats_pc_intl_students}
                  </p>
                ) : (
                  ""
                )}
                {this.props.info.stats_female_male_ratio ? (
                  <p>
                    <strong>Female to Male Ratio</strong>:{" "}
                    {this.props.info.stats_female_male_ratio}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withRouter(SchoolAdmin);
