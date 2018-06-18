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
  updateCode, codeSave, changeCodeBeingSubmitted, changeIsGameFetching, changeFirstMount,
  changeCodePreferences
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    initialLogin: state.initialLogin,
    firstMount: state.firstMount,
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
    pingStatus: state.pingStatusActive,
    isGameFetching: state.isGameFetching,
    codePreferences: state.codePreferences
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
    updateCompilationStatus: (status) => {dispatch(updateCompilationStatusAsync(status));},
    clearCompilationStatus: () => {dispatch(clearCompilationStatus());},
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    changePingStatusActive: (status) => {dispatch(changePingStatusActive(status));},
    getGameStatus: (trigger) => {dispatch(getGameStatus(trigger));},
    updateCode: (code) => {dispatch(codeSave(code));},
    changeCodeBeingSubmitted: (status) => {dispatch(changeCodeBeingSubmitted(status));},
    changeIsFetchingGame: (status) => {dispatch(changeIsGameFetching(status))},
    changeFirstMount: (firstMount) => {dispatch(changeFirstMount(firstMount ))},
    changeCodePreferences: (preferences) => {dispatch(changeCodePreferences(preferences))}
  }
};

const dashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default  dashboardContainer;
