import { connect }                             from 'react-redux';
import ProfileComponent                        from '../components/ProfileComponent';
import {
  changeProfileName,
  getProfileData,
  userAuthenticateCheck
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    profileData: state.profileData ? state.profileData : {name: '', id: 0, rating: 0, email: ''},
    userId: state.userId,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeProfileName: (name) => {dispatch(changeProfileName(name));},
    getProfileData: (id) => {console.log(id); dispatch(getProfileData(id))},
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());}
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);

export default ProfileContainer;
