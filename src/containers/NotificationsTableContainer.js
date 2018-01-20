import { connect }                             from 'react-redux';
import NotificationsTableComponent             from '../components/NotificationsTableComponent';

const mapStateToProps = state => {
  return null;
};

const mapDispatchToProps = dispatch => {
  return null;
};

const NotificationsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTableComponent);

export default NotificationsTableComponent;
