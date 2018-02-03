import { connect }                             from 'react-redux';
import GlobalComponent                         from '../components/GlobalComponent';
import {
  getCodeStatus,
  getGameStatus,
  getMatchStatus,
  getUnreadNotifications,
  competeAgainstAI, fetchGameLog, getCompilationStatus,
  fetchCode, updateUnreadNotifications, changePingStatusActive
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    codeStatus: state.codeStatus,
    matchStatus: state.matchStatus,
    lastUsed: state.lastUsed,
    aiId: state.activeAiId,
    matchId: state.lastMatchId,
    pingStatus: state.pingStatusActive
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
    changePingStatusActive: (status) => {dispatch(changePingStatusActive(status));}
  };
};

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComponent);

export default GlobalContainer;
