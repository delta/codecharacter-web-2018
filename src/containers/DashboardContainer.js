import { connect }                             from 'react-redux';
import DashboardComponent                      from '../components/DashboardComponent';
import {
  userLogout,
  runCode,
  lockCode,
  fetchCode,
  fetchGameLog
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    compilationStatus: state.compilationStatus,
    username: state.username,
    code: state.code,
    lastMatchId: state.lastMatchId,
    gameLog: state.gameLog,
    shouldFetchLog: ((state.lastUsed===1)&&(state.matchStatus==="success"))
  }
};

const mapDispatchToProps = dispatch => {
  return {
    runCode: (code) => {dispatch(runCode(code));},
    lockCode: (code) => {dispatch(lockCode(code));},
    fetchCode: ()  => {dispatch(fetchCode())},
    logout: () =>  {dispatch(userLogout());},
    fetchGameLog: () => {dispatch(fetchGameLog());}
  }
};

const dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default  dashboardContainer;
