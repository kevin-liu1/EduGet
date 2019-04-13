import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import GLOBALS from '../config/common';

export const AdminRoute = ({
  component: Component,
  ...rest
  }) => (
    <Route {...rest} component={ (props) => (
      user != null ? (
          <Component {...props}/>
      ) : (
        <Redirect to='/login' />
      )
    )} />
)

var user = localStorage.getItem('user_info')
export default AdminRoute;
