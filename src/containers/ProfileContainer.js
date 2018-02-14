import { connect }                             from 'react-redux';
import ProfileComponent                        from '../components/ProfileComponent';
import {
  changeIsFetching,
  changeIsGameFetching,
  changeProfile,
  getProfileData,
  userAuthenticateCheck
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    profileData: state.profileData ? state.profileData : {name: '', id: 0, rating: 0, email: '', nationality: ''},
    userId: state.userId,
    loginStatus: state.loginStatus,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeProfile: (name, nationality, id) => {dispatch(changeProfile(name, nationality, id));},
    getProfileData: (id) => {dispatch(getProfileData(id))},
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    changeIsFetching: (status) => {dispatch(changeIsFetching(status))}
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);

export default ProfileContainer;
