import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router-dom';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
    playersData: PropTypes.array,
    loginStatus: PropTypes.bool,
    totalUsers: PropTypes.number,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
    getUsersLength: PropTypes.func
  };

  static defaultProps = {
    userId: -1,
    playersData: [],
    loginStatus: false,
    totalUsers: 0,
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
    getUsersLength: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      pageCount: 1
    };
  }

  componentWillMount() {
    this.props.getUsersLength();
  }

  componentDidMount() {
    console.log(this.props.totalUsers);
    this.props.userAuthenticateCheck();
    this.props.fetchLeaderboardData(0, 5);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.pageCount !== nextState.pageCount) {
      this.props.fetchLeaderboardData((nextState.pageCount-1)*5, 5);
    }
  }

  render() {
    if (!this.props.loginStatus) {
      return <Redirect to='/login'/>
    }

    this.maxPages = Math.ceil(this.props.totalUsers/5);

    let tableColumns = (this.props.playersData).map((data, index) => {
      return (
        <tr key={index}>
          <td align="center" style={{padding: 0}}>
            {(data.id !== this.props.userId)
              ? <span className="btn btn-info" style={{borderRadius: 0, height: 49}} onClick={() => {this.props.startChallenge(data.id);}}>
                <img src={'assets/sword.png'} width="15" height="15" alt="challenge"/>
              </span>
              : null
            }
          </td>
          <td className="hidden-xs">{data.id}</td>
          <td>{data.name}</td>
          <td>{data.rating}</td>
        </tr>
      );
    });

    let listElements = [];

    for (let i=1;i<=this.maxPages;i++) {
      let classTag = (this.state.pageCount === i) ? 'active' : '';
      listElements.push(
        <li className={'page-item ' + classTag} key={i}>
          <button className="page-link "
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
                <input className="form-control" id="system-search" name="q" placeholder="Search for User" required style={{height: 46}}/>
                <span className="input-group-btn" style={{paddingLeft: 5, paddingRight: 5, paddingBottom: 10}}>
                  <button type="submit" className="btn btn-default"><i className="fa fa-search" aria-hidden="true"/></button>
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
                          <h3 className="panel-title">Leaderboard</h3>
                        </div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <table className="table table-striped table-bordered table-list">
                        <thead>
                        <tr>
                          <th style={{width: 50}}></th>
                          <th className="hidden-xs">User Id</th>
                          <th>Username</th>
                          <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableColumns}
                        </tbody>
                      </table>

                    </div>
                    <div className="panel-footer">
                      <div className="row">
                        <div className="col col-xs-4">Page {this.state.pageCount} of {this.maxPages}
                        </div>
                        <div className="col col-xs-8">
                          <ul className="pagination pagination-sm pull-right">
                            <li className="page-item" onClick={() => {this.setState({pageCount: (this.state.pageCount !== 1) ? this.state.pageCount-1 : 1})}}>
                              <button aria-label="Previous" className="page-link">
                                <span aria-hidden="true">&laquo;</span>
                              </button>
                            </li>
                            {listElements}
                            <li className="page-item" onClick={() => {this.setState({pageCount: (this.state.pageCount !== this.maxPages) ? this.state.pageCount+1 : this.maxPages})}}>
                              <span aria-label="Next" className="page-item">
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
