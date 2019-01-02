import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Main from '../components/Main';
import Profile from '../components/Profile';
import UserAgreement from '../components/UserAgreement';
import ResetPassword from '../components/ResetPassword';
import Register from '../components/SignUp';
import Login from '../components/SignIn';
import NewPassword from '../components/NewPassword'; //change user password
import Thankyou from '../components/Thankyou'; //thank you for creating a new account
import Nomatch from '../components/404nomatch'; //404 page not foune
import Testing from '../components/testing';


export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path='/' component={Main} exact={true} />
        <Route path='/profile' component={Profile} exact={true} />
        <Route path='/register' component={Register} exact={true}/>
        <Route path='/login' component={Login} exact={true} />
        <Route path='/user-agreement' component={UserAgreement} exact={true}/>
        <Route path='/password-reset' component={ResetPassword} exact={true}/>
        <Route path="/new-password" component={NewPassword} exact={true} />
        <Route path="/thank-you" component={Thankyou} exact={true} />
        <Route path="/testing" component={Testing} exact={true} /> //routing for test page
        <Route component={Nomatch} exact={true}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
