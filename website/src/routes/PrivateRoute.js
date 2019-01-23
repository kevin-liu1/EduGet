import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  ...rest
  }) => (
    <Route {...rest} component={ (props) => (
      localStorage.getItem('token') != null ? (
          <Component {...props}/>
      ) : (
        <Redirect to='/unauthorized' />
      )
    )} />
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.auth
})

export default connect(mapStateToProps)(PrivateRoute);
