import { connect }                             from 'react-redux';
import DashboardComponent                      from '../components/DashboardComponent';
import {
  userLogout,
  runCode,
  lockCode,
  fetchCode,
  fetchGameLog,
  getAIs,
  changeAIid,
  updateCompilationStatus,
  clearCompilationStatus,
  userAuthenticateCheck,
  updateCompilationStatusAsync,
  changePingStatusActive,
  getGameStatus,
  updateCode
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    initialLogin: state.initialLogin,
    loginStatus: state.loginStatus,
    codeStatus: state.codeStatus,
    matchStatus: state.matchStatus,
    compilationStatus: state.compilationStatus,
    username: state.username,
    code: state.code,
    lastMatchId: state.lastMatchId,
    gameLog: state.gameLog,
    shouldFetchLog: ((state.lastUsed===1)&&(state.matchStatus==="SUCCESS")),
    ais: state.ais,
    dLogs: state.dLogs,
    pingStatus: state.pingStatusActive
  }
};

const mapDispatchToProps = dispatch => {
  return {
    runCode: (code) => {dispatch(runCode(code));},
    lockCode: (code) => {dispatch(lockCode(code));},
    fetchCode: ()  => {dispatch(fetchCode())},
    logout: () =>  {dispatch(userLogout());},
    fetchGameLog: (matchId) => {dispatch(fetchGameLog(matchId));},
    getAIs: () => {dispatch(getAIs());},
    changeAIid: (id) => {dispatch(changeAIid(id))},
    updateCompilationStatus: (status) => {dispatch(updateCompilationStatus(status));},
    clearCompilationStatus: () => {dispatch(clearCompilationStatus());},
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    changePingStatusActive: (status) => {dispatch(changePingStatusActive(status));},
    getGameStatus: (trigger) => {dispatch(getGameStatus(trigger));},
    updateCode: (code) => {dispatch(updateCode(code));}
  }
};

const dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default  dashboardContainer;
