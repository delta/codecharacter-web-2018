import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router-dom';
import FlagIconFactory from 'react-flag-icon-css/lib/index';
import { getCountryName } from '../utils/countryCodes';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
    playersData: PropTypes.array,
    loginStatus: PropTypes.bool,
    totalUsers: PropTypes.number,
    isFetching: PropTypes.bool,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
    getUsersLength: PropTypes.func,
    searchUser: PropTypes.func
  };

  static defaultProps = {
    userId: -1,
    playersData: [],
    loginStatus: false,
    totalUsers: 0,
    isFetching: false,
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
    getUsersLength: () => {},
    searchUser: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      pageCount: 1,
      leaderboard: this.props.playersData,
      activeSearch: false
    };
    this.maxUserPerPage = 15;
  }

  componentDidMount() {
    this.props.userAuthenticateCheck();
    this.props.fetchLeaderboardData();
    this.setState({
      leaderboard: this.props.playersData
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leaderboard: nextProps.playersData
    });
    if (this.props.loginStatus !== nextProps.loginStatus) {
      this.props.fetchLeaderboardData();
    }
  }

  refresh = () => {
    this.props.fetchLeaderboardData();
  };

  searchUser = (event) => {
    if (event.target.value !== '') {
      let searchList = [];
      let searchPattern = new RegExp('^.*' + event.target.value + '.*$');
      for(let i=0;i<(this.props.playersData.length);i++) {
        if(this.props.playersData[i].name.match(searchPattern)) {
          searchList.push(this.props.playersData[i]);
        }
      }
      this.setState({
        leaderboard: searchList
      });
    }
    else {
      this.setState({
        leaderboard: this.props.playersData
      });
    }
  };

  render() {
    const FlagIcon = FlagIconFactory(React, { useCssModules: false });
    this.pages = Math.ceil(this.state.leaderboard.length/(this.maxUserPerPage));
    if(this.pages === 0) {
      this.pages = 1;
    }
    let tableColumns = [];
    for(let i=0;i<this.maxUserPerPage;i++) {
      let data = this.state.leaderboard[(this.state.pageCount - 1)*this.maxUserPerPage + i];
      if(data) {
        tableColumns[i] = (
          <tr key={i}>
            <td align="center" style={{ padding: 0 }}>
              {(data.id !== this.props.userId && this.props.loginStatus)
                ? <span className="btn btn-info" style={{
                  borderRadius: 0,
                  height: 49,
                  boxShadow: 'none',
                  cursor: 'pointer'
                }} onClick={() => {
                  this.props.startChallenge(data.id);
                }}>
                <img src={'assets/sword.png'} width="15" height="15" alt="challenge"/>
              </span>
                : null
              }
            </td>
            <td>{data.rank}</td>
            <td onClick={() => this.props.history.push('/' + data.name)}
                style={{ cursor: 'pointer' }}>
              {data.name}
              <span className={"pull-right"} style={{marginLeft: 10}} title={getCountryName(data.nationality)}>
                <FlagIcon
                  code={data.nationality ? data.nationality.toLowerCase() : 'in'}
                  size={'lg'}
                />
              </span>
            </td>
            <td>{data.rating}</td>
          </tr>
        );
      }
      else {
        tableColumns[i] = null;
      }
    }

    let listElements = [];
    for (let i=1;i<=this.pages;i++) {
      let classTag = (this.state.pageCount === i) ? 'active' : '';
      listElements.push(
        <li className={'page-item ' + classTag} key={i}>
          <button className="page-link " style={{cursor: 'pointer'}}
             onClick={() => this.setState({pageCount: i})}
          >
            {i}
            </button>
        </li>
      );
    }
    return (
      <div className="container" style={{paddingTop: 50}}>
        <div className="row">
          <div className="col-md-3">
              <div className="input-group">
                <input className="form-control" id="system-search" name="q" placeholder="Search for User" required style={{height: 46}} onChange={this.searchUser}/>
                <span className="input-group-btn" style={{paddingLeft: 5, paddingRight: 5, paddingBottom: 10}}>
                </span>
              </div>
          </div>
          <div className="col-md-9">
              <div className="row">
                <div className="col-md-12 col-md-offset-1">
                  <div className="panel panel-default panel-table">
                    <div className="panel-heading" style={{paddingBottom: 20}}>
                      <div className="row">
                        <div className="col col-xs-6">
                          <h3 className="panel-title pull-left">Leaderboard</h3>
                          <i className="fa fa-2x fa-refresh pull-right" style={{cursor: 'pointer'}} onClick={this.refresh}/>
                        </div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <table className="table table-striped table-bordered table-list">
                        <thead>
                        <tr>
                          <th style={{width: 50}}></th>
                          <th>Rank</th>
                          <th>Username</th>
                          <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!this.props.isFetching
                          ? tableColumns
                          : <tr>
                            <td></td>
                            <td></td>
                            <td style={{textAlign: 'center'}}>
                              <i className="fa fa-2x fa-circle-o-notch fa-spin"/>
                            </td>
                            <td></td>
                          </tr>}
                        </tbody>
                      </table>

                    </div>
                    <div className="panel-footer">
                      <div className="row">
                        <div className="col col-xs-4">Page {this.state.pageCount} of {this.pages}</div>
                        <div className="col col-xs-8">
                          <ul className="pagination pagination-sm pull-right">
                            <li className="page-item" onClick={() => {this.setState({pageCount: (this.state.pageCount !== 1) ? this.state.pageCount-1 : 1})}}>
                              <span aria-label="Previous" className="page-link" style={{cursor: 'pointer'}}>
                                <span aria-hidden="true">&laquo;</span>
                              </span>
                            </li>
                            {listElements}
                            <li className="page-item" onClick={() => {this.setState({pageCount: (this.state.pageCount !== this.pages) ? this.state.pageCount+1 : this.pages})}}>
                              <span aria-label="Next" className="page-item" style={{cursor: 'pointer'}}>
                                <span aria-hidden="true" className="page-link" >&raquo;</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div></div>
          </div>
        </div>
      </div>
    );
  }
}
