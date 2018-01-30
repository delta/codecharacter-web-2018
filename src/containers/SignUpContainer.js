import { connect }                             from 'react-redux';
import SignUpComponent                         from '../components/SignUpComponent';
import {
  userSignup
}                                              from '../redux/actions';


const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userSignup: (emailId, name, password, nationality) => {dispatch(userSignup(emailId, name, password, nationality));}
  }
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);

export default SignUpContainer;
