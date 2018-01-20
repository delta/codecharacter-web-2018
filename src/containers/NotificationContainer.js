import { connect }                             from 'react-redux';
import NotificationComponent                   from '../components/NotificationComponent';

const mapStateToProps = state => {
  console.log(state.notifications);
  return {
    notifications: state.notifications,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return null;
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent);

export default NotificationContainer;
