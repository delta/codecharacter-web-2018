import { connect }                             from 'react-redux';
import MatchViewComponent                      from '../components/MatchesViewComponent';
import {
  fetchMatchAllData, getMatchData, fetchGameLog,
  updateCompilationStatus, userAuthenticateCheck, getGameStatus
} from '../redux/actions';

const mapStateToProps = state => {
  // console.log(state.matchesData);
  return {
    matchesData: state.matchesData,
    loginStatus: state.loginStatus,
    compilationStatus: state.compilationStatus,
    gameLog: state.gameLog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    fetchMatchData: () => {dispatch(fetchMatchAllData());},
    getMatchData: (matchId) => {dispatch(getMatchData(matchId));},
    fetchGameLog: (matchId) => {dispatch(fetchGameLog(matchId));},
    updateCompilationStatus: (status) => {dispatch(updateCompilationStatus(status));},
    getGameStatus: () => {dispatch(getGameStatus());}
  };
};

const MatchesViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchViewComponent);

export default MatchesViewContainer;
