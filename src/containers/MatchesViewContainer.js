import { connect }                             from 'react-redux';
import MatchViewComponent                      from '../components/MatchesViewComponent';
import { matchFetchAll } from '../shellFetch/matchFetch';
import { fetchMatchData } from '../redux/actions';

const mapStateToProps = state => {
  return {
    matches: state.matchesData,
    loginStatus: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMatchData: () => {dispatch(fetchMatchData());}
  };
};

const MatchesViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchViewComponent);

export default MatchesViewContainer;
