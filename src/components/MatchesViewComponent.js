import React from 'react';
import PropTypes from 'prop-types';
import {
  Table
}             from 'react-bootstrap';
import DashboardComponent from './DashboardComponent';

export default class MatchesViewComponent extends React.Component {
  static propTypes = {
    matchesData: PropTypes.arrayOf(PropTypes.object),
    loginStatus: PropTypes.bool
  };

  static defaultProps = {
    matchesData: [
      {opponent: '106116053', gameStatus: 'Finished', result: 'Draw'},
      {opponent: '106116049', gameStatus: 'Finished', result: 'You Won'},
      {opponent: '106116066', gameStatus: 'Not Finished', result: 'Yet to be decided'}
    ],
    loginStatus: false
  };

  render() {
    let matchDataColumns = (this.props.matchesData).map((data,index) => {
      return (
          <tr key={index} align='center'>
            <td>{data.opponent}</td>
            <td>{data.gameStatus}</td>
            <td>{data.result}</td>
          </tr>
      );
    });

    let table = (
      <Table striped bordered condensed hover responsive className='table-success'>
        <thead>
        <tr align='center' >
          <th>Opponent</th>
          <th>Game Status</th>
          <th>Result</th>
        </tr>
        </thead>
        <tbody>
        {matchDataColumns}
        </tbody>
      </Table>
    );
    return (
      <DashboardComponent matchesViewTable={table} matchesView={true} loginStatus={this.props.loginStatus}/>
    );
  }
}
