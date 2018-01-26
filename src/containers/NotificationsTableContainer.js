import { connect }                             from 'react-redux';
import {
  getAllNotifications, userAuthenticateCheck
} from '../redux/actions';
import NotificationsTableComponent             from '../components/NotificationsTableComponent';

const mapStateToProps = state => {
  return {
    notifications: state.allNotifications,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    getAllNotifications: () => {dispatch(getAllNotifications());}
  };
};

const NotificationsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTableComponent);

export default NotificationsTableContainer;
