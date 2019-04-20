import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import GLOBALS from '../config/common';

export const AdminRoute = ({
  component: Component,
  ...rest
  }) => (
    <Route {...rest} component={ (props) => (
      localStorage.getItem('user_info') && JSON.parse(localStorage.getItem('user_info')).admin_institution != null ? (
          <Component {...props}/>
      ) : (
        <Redirect to='/login' />
      )
    )} />
)

export default AdminRoute;
