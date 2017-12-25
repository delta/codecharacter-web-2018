import React                          from 'react';
import { connect }                    from 'react-redux';
import { Redirect }                   from 'react-router';
import LoginComponent                 from '../components/LoginComponent';
import {
userAuthenticate
}                                     from '../actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    username: state.username
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (username, password) => {dispatch(userAuthenticate(username, password));},
    redirectToHome: () => {return (<Redirect to="/dashboard" />)}
  }
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
