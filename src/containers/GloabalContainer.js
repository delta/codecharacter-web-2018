import { connect }                             from 'react-redux';
import GlobalComponent                         from '../components/GlobalComponent';
import {
  getCodeStatus,
  getLatestMatchId,
  getMatchStatus,
  getUnreadNotifications,
  competeAgainstAI,
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCodeStatus: () => {dispatch(getCodeStatus());},
    getLatestMatchId: () => {dispatch(getLatestMatchId());},
    getMatchStatus: (matchId) => {dispatch(getMatchStatus(matchId));},
    getUnreadNotifications: () => {dispatch(getUnreadNotifications());},
    competeAgainstAI: (id) => {dispatch(competeAgainstAI(id));}
  };
};

const GlobalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComponent);

export default GlobalContainer;
