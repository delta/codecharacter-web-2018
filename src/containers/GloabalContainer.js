import { connect }                             from 'react-redux';
import GlobalComponent                         from '../components/GlobalComponent';
import {
  getCodeStatus,
  getGameStatus,
  getMatchStatus,
  getUnreadNotifications,
  competeAgainstAI, fetchGameLog, getCompilationStatus,
  fetchCode, updateUnreadNotifications, changePingStatusActive, codeSave, lockCode,
  changeCodeBeingSubmitted, changeLastUsed, changeIsGameFetching, changeTimeLeft
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    codeStatus: state.codeStatus,
    matchStatus: state.matchStatus,
    lastUsed: state.lastUsed,
    aiId: state.activeAiId,
    matchId: state.lastMatchId,
    pingStatus: state.pingStatusActive,
    code: state.code,
    codeBeingSubmitted: state.codeBeingSubmitted,
    timeLeft: state.timeLeft
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCodeStatus: () => {dispatch(getCodeStatus());},
    getMatchStatus: (id) => {dispatch(getMatchStatus(id));},
    getGameStatus: () => {dispatch(getGameStatus());},
    fetchGameLog: (matchId) => {dispatch(fetchGameLog(matchId));},
    getUnreadNotifications: () => {dispatch(getUnreadNotifications());},
    competeAgainstAI: (id) => {dispatch(competeAgainstAI(id));},
    getCompilationStatus: () => {dispatch(getCompilationStatus());},
    fetchCode: () => {dispatch(fetchCode());},
    addNotifications: (notifications) => {dispatch(updateUnreadNotifications(notifications));},
    changePingStatusActive: (status) => {dispatch(changePingStatusActive(status));},
    codeSave: (code) => {dispatch(codeSave(code));},
    lockCode: (code) => {dispatch(lockCode(code));},
    changeCodeBeingSubmitted: (status) => {dispatch(changeCodeBeingSubmitted(status))},
    changeLastUsed: (status) => {dispatch(changeLastUsed(status));},
    changeIsFetchingGame: (status) => {dispatch(changeIsGameFetching(status))},
    changeTimeLeft: (timeLeft) => {dispatch(changeTimeLeft(timeLeft))}
  };
};

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComponent);

export default GlobalContainer;
