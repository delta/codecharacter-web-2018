import { connect }                             from 'react-redux';
import ProfileComponent                        from '../components/ProfileComponent';
import {
  getProfileData,
  userAuthenticateCheck
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    profileData: state.profileData,
    userId: state.userId,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileData: (id) => {console.log(id); dispatch(getProfileData(id))},
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());}
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);

export default ProfileContainer;
