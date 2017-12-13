import { connect }                    from 'react-redux';
import LoginComponent                 from '../components/LoginComponent';
import {
  userSignup
}                                     from '../actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userSignup: (emailId, name, password) => {dispatch(userSignup(emailId, name, password));}
  }
};
