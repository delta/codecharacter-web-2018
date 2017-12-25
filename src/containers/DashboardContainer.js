import { connect }                    from 'react-redux';
import DashboardComponent             from '../components/DashboardComponent';
import {
  userLogout,
  runCode,
  lockCode
}                                     from '../actions';

const mapStateToProps = state => {
  return {
    username: state.username,
    compilationStatus: state.compilationStatus,
    code: state.code
  }
};

const mapDispatchToProps = dispatch => {
  return {
    runCode: (username, code) => {dispatch(runCode(username, code));},
    lockCode: (username) => {dispatch(lockCode(username));},
    logout: () =>  {dispatch(userLogout);}
  }
};

const dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default  dashboardContainer;
