import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router-dom';
import { Table }                                  from 'react-bootstrap';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    playersData: PropTypes.array,
    loginStatus: PropTypes.bool,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
  };

  static defaultProps = {
    playersData: [],
    loginStatus: false,
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
  };

  componentDidMount() {
    this.props.fetchLeaderboardData();
  }

  render() {
    if (!this.props.loginStatus) {
      return <Redirect to='/login'/>
    }

    let tableColumns = (this.props.playersData).map((data, index) => {
      return (
        <tr key={index} align='center'>
          <td>
            <img
            onClick={() => this.props.startChallenge(data.id)}
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
