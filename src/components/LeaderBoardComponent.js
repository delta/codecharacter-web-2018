import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router-dom';
import { Table }                                  from 'react-bootstrap';
// import ReactPaginate                              from 'react-paginate';

export default class LeaderBoardComponent extends React.Component {
  static propTypes = {
    userId: PropTypes.object,
    playersData: PropTypes.array,
    loginStatus: PropTypes.bool,
    fetchLeaderboardData: PropTypes.func,
    startChallenge: PropTypes.func,
  };

  static defaultProps = {
    userId: -1,
    playersData: [],
    loginStatus: false,
    fetchLeaderboardData: () => {},
    startChallenge: () => {},
  };

  componentDidMount() {
    this.props.userAuthenticateCheck();
    this.props.fetchLeaderboardData();
  }

  render() {
    if (!this.props.loginStatus) {
      return <Redirect to='/login'/>
    }

    let tableColumns = (this.props.playersData).map((data, index) => {
      console.log(data.id, this.props.userId);
      return (
        <tr key={index}>
          <td align="center">
            {(data.id !== this.props.userId.userId)
              ? <a className="btn btn-danger">
                <img src={'assets/sword.png'} width="15" height="15"
                     onClick={this.props.startChallenge(data.id)}/>
              </a>
              : null
            }
          </td>
          <td className="hidden-xs">{data.id}</td>
          <td>{data.name}</td>
          <td>{data.rating}</td>
        </tr>
      );
    });

    return (
      <div className="container" style={{paddingTop: 50}}>
        <div className="row">
          <div className="col-md-3">
            <form action="#" method="get">
              <div className="input-group">
                <input className="form-control" id="system-search" name="q" placeholder="Search for" required/>
                    <span className="input-group-btn" style={{paddingLeft: 5, paddingRight: 5}}>
                        <button type="submit" className="btn btn-default"><i className="fa fa-search" aria-hidden="true"/></button>
                    </span>
              </div>
            </form>
          </div>
          <div className="col-md-9">
            <div className="container">
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
                          <th></th>
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
                        <div className="col col-xs-4">Page 1 of 5
                        </div>
                        <div className="col col-xs-8">
                          <ul className="pagination pull-right">
                            <li className="page-item"><a className="nav-item" href="#">1</a></li>
                            <li className="page-item"><a className="nav-item" href="#">2</a></li>
                            <li className="page-item"><a className="nav-item" href="#">3</a></li>
                            <li className="page-item"><a className="nav-item" href="#">4</a></li>
                            <li className="page-item"><a className="nav-item" href="#">5</a></li>
                          </ul>
                          <ul className="pagination pull-right">
                            <li className="page-item"><a href="#">«</a></li>
                            <li className="page-item"><a href="#">»</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                </div></div></div>
          </div>
        </div>
      </div>
    );
  }
}

{/*<div>
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
        <div className="span12 center-block">
            <ul className="pagination text-center">
              <li className="page-item disabled">
                <a className="page-link" href="#">&laquo;</a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">&raquo;</a>
              </li>
            </ul>
        </div>
      </div>*/}
