import { connect }                    from 'react-redux';
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
  }
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginContainer;
