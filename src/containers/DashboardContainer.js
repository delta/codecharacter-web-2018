import { connect }                             from 'react-redux';
import DashboardComponent                      from '../components/DashboardComponent';
import {
  userLogout,
  runCode,
  lockCode,
  fetchCode,
  fetchGameLog,
  getAIs,
  changeAIid, updateCompilationStatus, clearCompilationStatus, userAuthenticateCheck
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    initialLogin: state.initialLogin,
    loginStatus: state.loginStatus,
    compilationStatus: state.compilationStatus,
    username: state.username,
    code: state.code,
    lastMatchId: state.lastMatchId,
    gameLog: state.gameLog,
    shouldFetchLog: ((state.lastUsed===1)&&(state.matchStatus==="SUCCESS")),
    ais: state.ais
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
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());}
  }
};

const dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default  dashboardContainer;
