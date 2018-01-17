import { connect }                             from 'react-redux';
import DashboardComponent                      from '../components/DashboardComponent';
import {
  userLogout,
  runCode,
  lockCode,
  fetchCode,
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    compilationStatus: state.compilationStatus,
    username: state.username,
    code: state.code,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    runCode: (code) => {dispatch(runCode(code));},
    lockCode: (code) => {dispatch(lockCode(code));},
    fetchCode: ()  => {dispatch(fetchCode())},
    logout: () =>  {dispatch(userLogout());},
  }
};

const dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default  dashboardContainer;
