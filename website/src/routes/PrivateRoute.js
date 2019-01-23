import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  ...rest
  }) => (
    <Route {...rest} component={ (props) => (
      localStorage.getItem('token') != null ? (
          <Component {...props}/>
      ) : (
        <Redirect to='/login' />
      )
    )} />
)

export default PrivateRoute;
