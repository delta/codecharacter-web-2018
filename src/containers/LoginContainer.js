import { connect }                    from 'react-redux';
import LoginComponent                 from '../components/LoginComponent';
import {
  userAuthenticate, userAuthenticateCheck,
  userLogout
} from '../actions';

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
    authenticateCheck: (username) => {dispatch(userAuthenticateCheck(username));},
    logout: () => {dispatch(userLogout());}
  }
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
