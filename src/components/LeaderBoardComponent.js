import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router-dom';
import { Table }                                  from 'react-bootstrap';

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
    playersData: [
      {name: '106116001', rating: '10', id: '1'},
      {name: '106116003', rating: '12', id: 2},
      {name: '106116005', rating: '8', id: 3}
    ],
    username: '000000000',
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
    logout: () => {}
  };

  componentDidMount() {
    this.props.fetchLeaderboardData();
  }

  startChallenge = (opponent) => {
    console.log(opponent);
    this.props.startChallenge(opponent);
  };

  render() {
    if (!this.props.loginStatus) {
      return <Redirect to='/login'/>
    }

    let tableColumns = (this.props.playersData).map((data, index) => {
      return (
        <tr key={index} align='center'>
          <td>
            <img
            onClick={() => this.startChallenge(data.id)}
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
