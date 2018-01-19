import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Link }                                   from 'react-router-dom';

export default class NavbarComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    onLogout: PropTypes.func
  };

  static defaultProps = {
    loginStatus: false,
    onLogout: () => {}
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{paddingTop: 0, paddingBottom: 0, minHeight: 50}}>
        <Link className="navbar-brand" to={"/login"} style={{fontWeight: 900, color: 'hsla(0,0%,100%,.8)', fontSize: '1.25rem'}}>Code Character</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        {this.props.loginStatus
          ? <div className="collapse navbar-collapse" id={"navbarColor02"}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"}>Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/leaderboard"}>Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/matches"}>Matches</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/rules"}>Rules</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => {this.props.onLogout();}}>Logout</span>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <span className="circle" style={{paddingRight: 20, marginBottom: 3}}/>
              <span className="nav-item" style={{color: 'hsla(0,0%,100%,0.5)', fontSize: 16, fontWeight: 900 }}>Compiling</span>
            </form>
          </div>
          : <div className="collapse navbar-collapse" id={"navbarColor02"}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>Home</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/rules"}>Rules</Link>
              </li>
          </ul></div>}
      </nav>
    );
  }
}
