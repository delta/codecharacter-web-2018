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
    let bgColors = {
      lost: "#FFB4B4",
      won: "#B2DEB5",
      tie: "#FFF8B4"
    };
    let matchDataColumns = matchData.slice().reverse().map((data,index) => {
      console.log(data);
      let winnerId = (data.scorep1 > data.scorep2) ? data.users[0].id : (data.scorep1 < data.scorep2) ? data.users[1] : -1;
      let result;
      if (winnerId === this.props.userId) {
        result = 'won';
      } else if (winnerId === -1) {
        result = 'tie';
      } else {
        result = 'lost';
      }
      let date = new Date(data.createdAt);
      return (
          <tr key={index} align='center' style={{backgroundColor: bgColors[result]}}>
            <td onClick={() => {this.props.fetchGameLog(data.id);}}><i className="fa fa-play" aria-hidden="true" style={{cursor: 'pointer'}}/></td>
            <td>{date.toLocaleDateString()}  {date.toLocaleTimeString('en-US')}</td>
            <td>{data.users[0].name}</td>
            <td>{data.scorep1}</td>
            <td>{data.users[1].name}</td>
            <td>{data.scorep2}</td>
          </tr>
      );
    });

    let table = (
      <div className='table-responsive' style={{height: (window.innerHeight - 50)}}>
        <table className='table table-striped table-bordered table-hover'>
        <thead>
        <tr align='center'>
          <th>View Match</th>
          <th>Time</th>
          <th>Player 1</th>
          <th>Score 1</th>
          <th>Player 2</th>
          <th>Score 2</th>
        </tr>
        </thead>
        <tbody>
        {matchDataColumns}
        </tbody>
        </table>
        {(!this.props.matchesData || this.props.matchesData.length===0) ? <h4 style={{textAlign: 'center'}}>No matches played</h4> : null}
      </div>
    );
    return <DashboardComponent
      userAuthenticateCheck={this.props.userAuthenticateCheck}
      updateCompilationStatus={this.props.updateCompilationStatus}
      compilationStatus={this.props.compilationStatus}
      matchesViewTable={table}
      matchesView={true}
      codeStatus={'SUCCESS'}
      matchStatus={'SUCCESS'}
      loginStatus={this.props.loginStatus}
      gameLog={this.props.gameLog}
      getGameStatus={this.props.getGameStatus}
      defaultText={'Click a match to view the game'}
    />
  }
}
