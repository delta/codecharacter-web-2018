import React                              from 'react';
import PropTypes                          from 'prop-types';
import {
  Table
}                                         from 'react-bootstrap';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    playersData: PropTypes.array,
    username: PropTypes.string,
    loginStatus: PropTypes.bool,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
    logout: PropTypes.func
  };

  static defaultProps = {
    playersData: [{name: '106116001', rating: '10', id: '1'}, {name: '106116003', rating: '12', id: 2}, {name: '106116005', rating: '8', id: 3}],
    username: '000000000',
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
    logout: () => {}
  };

  componentWillMount() {
    if(!this.props.loginStatus) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loginStatus) {
      this.props.history.push('/login');
    }
  }

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
            alt='Fight'
            style={{cursor: 'pointer', width: 20, height: 20}}
            />
          </td>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.rating}</td>
        </tr>
      );
    });
    return (
      <div>
        <Table striped bordered condensed hover responsive>
          <thead align='center'>
            <tr>
              <th>Fight</th>
              <th>Id</th>
              <th>Name</th>
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
