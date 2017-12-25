import React                              from 'react';
import PropTypes                          from 'prop-types';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    playersData: PropTypes.array,
    username: PropTypes.string,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
    logout: PropTypes.func
  };

  static defaultProps = {
    playersData: [],
    username: '000000000',
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
    logout: () => {}
  };

  componentDidMount() {
    this.props.fetchLeaderboardData();
  }

  startChallenge = (opponent) => {
    this.props.startChallenge(this.props.username, opponent);
  };

  render() {
    return null;
  }
}
