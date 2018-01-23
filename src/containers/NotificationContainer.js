import { connect }                             from 'react-redux';
import NotificationComponent                   from '../components/NotificationComponent';
import {
  changeCodeStatus,
  getCodeStatus,
  getMatchStatus,
  getLatestMatchId,
  getUnreadNotifications
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    loginStatus: state.loginStatus,
    lastUsed: state.lastUsed,
    matchId: state.lastMatchId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCodeStatus: () => {dispatch(getCodeStatus());},
    changeStatus: () => {dispatch(changeCodeStatus());},
    getLatestMatchId: () => {},
    getMatchStatus: () => {},
    getUnreadNotifications: () => {}
  };
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent);

export default NotificationContainer;
