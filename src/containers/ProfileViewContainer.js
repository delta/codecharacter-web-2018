import { connect }                             from 'react-redux';
import ProfileViewComponent                        from '../components/ProfileViewComponent';
import {
  getProfileViewData, startChallenge,
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    userId: state.userId,
    profileViewData: state.profileViewData ? state.profileViewData : {name: '', id: 0, rating: 0, email: '', nationality: ''},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileViewData: (name) => {dispatch(getProfileViewData(name))},
    challengePlayer: (id) => {dispatch(startChallenge(id))}
  };
};

const ProfileViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent);

export default ProfileViewContainer;
