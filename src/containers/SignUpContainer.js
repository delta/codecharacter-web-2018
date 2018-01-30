import { connect }                             from 'react-redux';
import SignUpComponent                         from '../components/SignUpComponent';
import {
  updateUnreadNotifications, updateUserLoginStatus,
  userSignup
} from '../redux/actions';


const mapStateToProps = state => {
  return {
    signupMessage: state.signupMessage,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userSignup: (emailId, name, password, nationality) => {dispatch(userSignup(emailId, name, password, nationality));},
    addNotifications: (notifications) => {dispatch(updateUnreadNotifications(notifications));}
  }
};

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);

export default SignUpContainer;
