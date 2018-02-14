import { connect }                             from 'react-redux';
import LeaderBoardComponent                    from '../components/LeaderBoardComponent';
import {
  fetchLeaderboardData, getUsersLength, searchUser,
  startChallenge, updateLeaderboard, userAuthenticateCheck
} from '../redux/actions';

const mapStateToProps = state => {
  return {
    userId: state.userId,
    playersData: state.leaderboardData,
    loginStatus: state.loginStatus,
    totalUsers: state.totalUsers,
    isFetching: state.isFetching,
    timeLeft: state.timeLeft
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticateCheck: () => {dispatch(userAuthenticateCheck());},
    fetchLeaderboardData: () => {dispatch(fetchLeaderboardData());},
    updateLeaderboard: (table) => {dispatch(updateLeaderboard(table));},
    startChallenge: (opponent) => {dispatch(startChallenge(opponent))},
    getUsersLength: () => {dispatch(getUsersLength());},
    searchUser: (pattern, size) => {dispatch(searchUser(pattern, size));}
  };
};

const LeaderBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardComponent);

export default LeaderBoardContainer;
