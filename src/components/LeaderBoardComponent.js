import React                              from 'react';
import PropTypes                          from 'prop-types';
import {
  Table
}                                         from 'react-bootstrap';
import NavbarComponent                    from './NavbarComponent';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    playersData: PropTypes.array,
    username: PropTypes.string,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
    logout: PropTypes.func
  };

  static defaultProps = {
    playersData: [{username: '106116001', rating: '10', rank: '1'}, {username: '106116003', rating: '12', rank: 2}, {username: '106116005', rating: '8', rank: 3}],
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
    let tableColumns = (this.props.playersData).map((data, index) => {
      return (
        <tr key={index} align='center'>
          <td>
            <img
            onClick={() => this.startChallenge(data.username)}
            src='http://www.pngmart.com/files/1/Cross-Sword-PNG-Clipart.png'
            style={{cursor: 'pointer', width: 20, height: 20}}
            />
          </td>
          <td>{data.rank}</td>
          <td>{data.username}</td>
          <td>{data.rating}</td>
        </tr>
      );
    });
    return (
      <div>
        <NavbarComponent/>
        <Table striped bordered condensed hover responsive>
          <col width='70'/>
          <thead align='center'>
            <tr>
              <th>Fight</th>
              <th>Rank</th>
              <th>Username</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {tableColumns}
          </tbody>
        </Table>
      </div>
    );
  }
}
