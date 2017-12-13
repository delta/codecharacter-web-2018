import { connect }                    from 'react-redux';
import LoginComponent                 from '../components/LoginComponent';
import {actions}                      from '../reducers';
import { BrowserHistory }             from 'react-router'

const mapStateToProps = state => {
  return {
    loginStatus: state.get('loginStatus');
  }
};

const mapDispatchToProps = dispatch => {
  return {
    redirectDashboard: () => {BrowserHistory.push('/dashboard');},
    authenticate: (username, password) => {dispatch(actions.authenticateUser(username, password));};
  }
};
