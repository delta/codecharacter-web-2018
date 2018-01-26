import { connect }                             from 'react-redux';
import GlobalComponent                         from '../components/GlobalComponent';
import {
  getCodeStatus,
  getLatestMatchId,
  getMatchStatus,
  getUnreadNotifications,
  competeAgainstAI, fetchGameLog, getCompilationStatus,
  fetchCode, updateUnreadNotifications
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    codeStatus: state.codeStatus,
    matchStatus: state.matchStatus,
    lastUsed: state.lastUsed,
    aiId: state.activeAiId,
    matchId: state.lastMatchId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCodeStatus: () => {dispatch(getCodeStatus());},
    getMatchStatus: (id) => {dispatch(getMatchStatus(id));},
    getLatestMatchId: () => {dispatch(getLatestMatchId());},
    fetchGameLog: (matchId) => {dispatch(fetchGameLog(matchId));},
    getUnreadNotifications: () => {dispatch(getUnreadNotifications());},
    competeAgainstAI: (id) => {dispatch(competeAgainstAI(id));},
    getCompilationStatus: () => {dispatch(getCompilationStatus());},
    fetchCode: () => {dispatch(fetchCode());},
    addNotifications: (notifications) => {dispatch(updateUnreadNotifications(notifications));}
  };
};

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComponent);

export default GlobalContainer;
