import { connect }                             from 'react-redux';
import ProfileViewComponent                        from '../components/ProfileViewComponent';
import {
  getProfileViewData,
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    profileViewData: state.profileViewData ? state.profileViewData : {name: '', id: 0, rating: 0, email: ''},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileViewData: (name) => {dispatch(getProfileViewData(name))}
  };
};

const ProfileViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileViewComponent);

export default ProfileViewContainer;
