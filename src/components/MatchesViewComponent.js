import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import {
  Table
}                                                 from 'react-bootstrap';
import DashboardComponent                         from './DashboardComponent';

export default class MatchesViewComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    matchesData: PropTypes.arrayOf(PropTypes.object),
    fetchGameLog: PropTypes.func,
    fetchMatchData: PropTypes.func,
  };

  static defaultProps = {
    matchesData: [],
    loginStatus: false,
    fetchMatchData: () => {},
    fetchGameLog: () => {}
  };

  componentDidMount() {
    this.props.fetchMatchData();
  }

  render() {
    let matchDataColumns = (this.props.matchesData).map((data,index) => {
      return (
          <tr key={index} align='center' onClick={() => {console.log(data); this.props.fetchGameLog(data.id);}}>
            <td>{data.player_id1}</td>
            <td>{data.player_id2}</td>
            <td>{data.status}</td>
          </tr>
      );
    });

    let table = (
      <Table striped bordered condensed hover responsive className='table-success'>
        <thead>
        <tr align='center'>
          <th>Player 1</th>
          <th>Player 2</th>
          <th>Result</th>
        </tr>
        </thead>
        <tbody>
        {matchDataColumns}
        </tbody>
      </Table>
    );
    return <DashboardComponent updateCompilationStatus={this.props.updateCompilationStatus} compilationStatus={this.props.compilationStatus} matchesViewTable={table} matchesView={true} loginStatus={this.props.loginStatus} gameLog={this.props.gameLog}/>
  }
}
