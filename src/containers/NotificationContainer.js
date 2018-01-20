import { connect }                             from 'react-redux';
import NotificationComponent                   from '../components/NotificationComponent';
import { changeStatus, getCodeStatus } from '../redux/actions';

const mapStateToProps = state => {
  console.log(state.notifications);
  return {
    notifications: state.notifications,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCodeStatus: () => {dispatch(getCodeStatus());},
    changeStatus: () => {dispatch(changeStatus());}
  };
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent);

export default NotificationContainer;
