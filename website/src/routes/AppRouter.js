import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Main from '../components/Main';
import Profile from '../components/Profile';
import UserAgreement from '../components/UserAgreement';
import ResetPassword from '../components/ResetPassword';
import Register from '../components/SignUp';
import Login from '../components/SignIn';
import NewPassword from '../components/NewPassword'; //change user password
import Thankyou from '../components/Thankyou'; //thank you for creating a new account
import Nomatch from '../components/404nomatch'; //404 page not found
import Testing from '../components/testing';
import CreateProfile from '../components/CreateProfile';
import Summary from '../components/Summary';
import School from '../components/SchoolComponents/School.js';
import SchoolPage from '../components/SchoolComponents/SchoolPage.js';
import Applications from '../components/MyApplications.js'
import SchoolAdmin from '../components/SchoolComponents/SchoolAdmin.js';


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
        <PublicRoute path='/password-reset' component={ResetPassword} exact={true}/>
        <PublicRoute path="/new-password" component={NewPassword} exact={true} />
        <PublicRoute path="/thank-you" component={Thankyou} exact={true} />
        <PublicRoute path="/create-profile" component={CreateProfile} exact={true} />
        <PublicRoute path="/404" component={Nomatch} exact={true} />
        <PublicRoute path="/summary" component={Summary} exact={true} />
        <PublicRoute path="/schools" component={School} exact={true}/>
        <PublicRoute path="/schools/:uid" component={SchoolPage} exact={true} />
        <PublicRoute path="/applications" component={Applications} exact={true}/>{/* todo make it private after finish */}
        <PublicRoute path="/schools-admin/:uid" component={SchoolAdmin} exact={true} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
