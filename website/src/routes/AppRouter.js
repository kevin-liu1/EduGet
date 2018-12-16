import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Main from '../components/Main';
import Profile from '../components/Profile';
import UserAgreement from '../components/UserAgreement';
import ResetPassword from '../components/ResetPassword';
import EditProfile from '../components/EditProfile';

export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path='/' component={Main} exact={true} />
        <Route path='/profile' component={Profile} exact={true} />
        <Route path='/profile/edit' component={EditProfile} exact={true}/>
        <Route path='/user-agreement' component={UserAgreement} exact={true}/>
        <Route path='/password-reset' component={ResetPassword} exact={true}/>

      </Switch>
    </div>
  </Router>
);

export default AppRouter;
