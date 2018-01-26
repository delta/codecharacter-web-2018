import { connect }                             from 'react-redux';
import {
  deleteNotification,
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
    deleteNotification: (id) => {dispatch(deleteNotification(id));},
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    getAllNotifications: () => {dispatch(getAllNotifications());}
  };
};

const NotificationsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTableComponent);

export default NotificationsTableContainer;
