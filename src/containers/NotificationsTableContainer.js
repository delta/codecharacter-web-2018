import { connect }                             from 'react-redux';
import {
  getAllNotifications
}                                              from '../redux/actions';
import NotificationsTableComponent             from '../components/NotificationsTableComponent';

const mapStateToProps = state => {
  return {
    notifications: state.allNotifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllNotifications: () => {dispatch(getAllNotifications());}
  };
};

const NotificationsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTableComponent);

export default NotificationsTableContainer;
