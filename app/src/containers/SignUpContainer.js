import { connect }                    from 'react-redux';
import SignUpComponent                 from '../components/SignUpComponent';
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

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);

export default SignUpContainer;
