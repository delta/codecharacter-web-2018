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
    updateCompilationStatus: PropTypes.func,
    userAuthenticateCheck: PropTypes.func
  };

  static defaultProps = {
    matchesData: [],
    loginStatus: false,
    fetchMatchData: () => {},
    fetchGameLog: () => {},
    updateCompilationStatus: () => {},
    userAuthenticateCheck: () => {}
  };

  componentDidMount() {
    this.props.fetchMatchData();
  }

  render() {
    let matchData = (this.props.matchesData);
    console.log(matchData);
    let matchDataColumns = matchData.map((data,index) => {
      let date = new Date(data.createdAt);
      return (
          <tr key={index} align='center'>
            <td onClick={() => {this.props.fetchGameLog(data.id);}}><i className="fa fa-play" aria-hidden="true" style={{cursor: 'pointer'}}/></td>
            <td>{date.toLocaleDateString()}  {date.toLocaleTimeString('en-US')}</td>
            <td>{data.player_id1}</td>
            <td>{data.scorep1}</td>
            <td>{data.player_id2}</td>
            <td>{data.scorep2}</td>
            <td>{(data.scorep1 > data.scorep2) ? 'Player 1 Won' : 'Player 2 Won'}</td>
          </tr>
      );
    });

    let table = (
      <div className='table-responsive' style={{height: (window.innerHeight - 50)}}>
        <table className='table-success table table-striped table-bordered table-hover'>
        <thead>
        <tr align='center'>
          <th>Play</th>
          <th>Last Updated</th>
          <th>Player 1</th>
          <th>Score 1</th>
          <th>Player 2</th>
          <th>Score 2</th>
          <th>Result</th>
        </tr>
        </thead>
        <tbody>
        {matchDataColumns}
        </tbody>
        </table>
      </div>
    );
    return <DashboardComponent
      userAuthenticateCheck={this.props.userAuthenticateCheck}
      updateCompilationStatus={this.props.updateCompilationStatus}
      compilationStatus={this.props.compilationStatus}
      matchesViewTable={table}
      matchesView={true}
      loginStatus={this.props.loginStatus}
      gameLog={this.props.gameLog}
      defaultText={'Click on any matches to view the gameplay'}
    />
  }
}
