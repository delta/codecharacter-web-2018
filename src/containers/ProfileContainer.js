import { connect }                             from 'react-redux';
import ProfileComponent                        from '../components/ProfileComponent';
import {
  userAuthenticateCheck
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());}
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);

export default ProfileContainer;
