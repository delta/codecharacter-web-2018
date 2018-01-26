import { connect }                             from 'react-redux';
import ProfileComponent                        from '../components/ProfileComponent';
import {
  getProfileData,
  userAuthenticateCheck
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus
    // profileData: state.profileData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());}
    // getProfileData: (username) => {dispatch(getProfileData(username))}
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);

export default ProfileContainer;
