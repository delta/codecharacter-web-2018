import { connect }                             from 'react-redux';
import MatchViewComponent                      from '../components/MatchesViewComponent';
import { matchFetchAll } from '../shellFetch/matchFetch';
import { fetchMatchAllData, getMatchData, fetchGameLog } from '../redux/actions';

const mapStateToProps = state => {
  return {
    matchesData: state.matchesData,
    loginStatus: state.loginStatus,
    compilationStatus: state.compilationStatus,
    gameLog: state.gameLog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMatchData: () => {dispatch(fetchMatchAllData());},
    getMatchData: (matchId) => {dispatch(getMatchData(matchId));},
    fetchGameLog: (matchId) => {dispatch(fetchGameLog(matchId));}
  };
};

const MatchesViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchViewComponent);

export default MatchesViewContainer;
