import { connect }        from 'react-redux';
import MatchViewComponent from '../components/MatchesViewComponent';

const mapStateToProps = state => {
  return {
    matches: state.matchesData,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

const MatchesViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchViewComponent);

export default MatchesViewContainer;
