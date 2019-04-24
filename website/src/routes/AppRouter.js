import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import AdminRoute from './AdminRoute'
import Main from '../components/Main';
import Profile from '../components/ProfileComponents/Profile';
import UserAgreement from '../components/UserAgreement';
import Register from '../components/SignUp';
import Login from '../components/SignIn';
import Nomatch from '../components/404nomatch'; //404 page not found
import School from '../components/SchoolComponents/School.js';
import SchoolPage from '../components/SchoolComponents/SchoolPage.js';
import Program from '../components/ProgramComponents/Program.js';
import ProgramRecommended from '../components/ProgramComponents/ProgramRecommended.js';
import ProgramPage from '../components/ProgramComponents/ProgramPage.js';
import Applications from '../components/MyApplications.js'
import SchoolAdmin from '../components/SchoolComponents/SchoolAdmin.js';
import PublicProfile from '../components/ProfileComponents/PublicProfile.js'


export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={Main} exact={true} />
        <PrivateRoute path='/profile' component={Profile} exact={true} />
        {/* <PrivateRoute path='/applications' component={Applications} exact={true} /> */}
        <PublicRoute path='/register' component={Register} exact={true}/>
        <PublicRoute path='/login' component={Login} exact={true} />
        <PublicRoute path='/user-agreement' component={UserAgreement} exact={true}/>
        <PublicRoute path="/schools" component={School} exact={true}/>
        <PublicRoute path="/schools/:uid" component={SchoolPage} exact={true} />
        <PublicRoute path="/programs" component={Program} exact={true}/>
        <PublicRoute path="/programs/recommended" component={ProgramRecommended} exact={true}/>
        <PublicRoute path="/programs/:uid" component={ProgramPage} exact={true} />
        <PrivateRoute path="/applications" component={Applications} exact={true}/>{/* todo make it private after finish */}
        <AdminRoute path="/school-admin/" component={SchoolAdmin} exact={true} />
        <AdminRoute path="/profile/:uid" component={PublicProfile} exact={true} />
        <PublicRoute component={Nomatch} exact={true} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
