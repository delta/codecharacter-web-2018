import { connect }                             from 'react-redux';
import GlobalComponent                         from '../components/GlobalComponent';
import {
  getCodeStatus,
  getGameStatus,
  getMatchStatus,
  getUnreadNotifications,
  competeAgainstAI, fetchGameLog, getCompilationStatus,
  fetchCode, updateUnreadNotifications, changePingStatusActive, codeSave, lockCode,
  changeCodeBeingSubmitted
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
    codeBeingSubmitted: state.codeBeingSubmitted
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
    changeCodeBeingSubmitted: (status) => {dispatch(changeCodeBeingSubmitted(status));}
  };
};

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComponent);

export default GlobalContainer;
