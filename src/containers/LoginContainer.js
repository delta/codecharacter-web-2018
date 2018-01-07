import React                          from 'react';
import { connect }                    from 'react-redux';
import { Redirect }                   from 'react-router';
import LoginComponent                 from '../components/LoginComponent';
import {
  userAuthenticate,
  userLogout
}                                     from '../actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    username: state.username,
    loginMessage: state.loginMessage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (username, password) => {dispatch(userAuthenticate(username, password));},
    logout: () => {dispatch(userLogout());}
  }
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
