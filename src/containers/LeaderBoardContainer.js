import { connect }                    from 'react-redux';
import LeaderBoardComponent           from '../components/LeaderBoardComponent';
import {
  fetchLeaderboardData,
  startChallenge
}                                     from '../actions';

const mapStateToProps = state => {
  return {
    playersData: state.leaderboardData,
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLeaderboardData: () => {dispatch(fetchLeaderboardData());},
    startChallenge: (username, opponent) => {dispatch(startChallenge(username, opponent))}
  };
};

const LeaderBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardComponent);

export default LeaderBoardContainer;
