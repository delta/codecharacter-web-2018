import { connect }                             from 'react-redux';
import LeaderBoardComponent                    from '../components/LeaderBoardComponent';
import {
  fetchLeaderboardData,
  startChallenge
}                                              from '../redux/actions';

const mapStateToProps = state => {
  return {
    playersData: state.leaderboardData,
    loginStatus: state.loginStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLeaderboardData: () => {dispatch(fetchLeaderboardData());},
    startChallenge: (opponent) => {dispatch(startChallenge(opponent))},
  };
};

const LeaderBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardComponent);

export default LeaderBoardContainer;
