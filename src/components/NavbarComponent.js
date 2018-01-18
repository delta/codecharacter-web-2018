import React                                      from 'react';
import PropTypes                                  from 'prop-types';

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
        <a className="navbar-brand" href={"/login"} style={{fontWeight: 900, color: 'hsla(0,0%,100%,.8)', fontSize: '1.25rem'}}>Code Character</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        {this.props.loginStatus
          ? <div className="collapse navbar-collapse" id={"navbarColor02"}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href={"/"}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/profile"}>Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/dashboard"}>Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/leaderboard"}>Leaderboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/matches"}>Matches</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/rules"}>Rules</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => {this.props.onLogout();}}>Logout</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <span className="circle" style={{paddingRight: 20, marginBottom: 3}}/>
              <a className="nav-item" style={{color: 'hsla(0,0%,100%,0.5)', fontSize: 16, fontWeight: 900 }}>Compiling</a>
            </form>
          </div>
          : <div className="collapse navbar-collapse" id={"navbarColor02"}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href={"/"}>Home</a>
            </li>
              <li className="nav-item">
                <a className="nav-link" href={"/login"}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/signup"}>Signup</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/rules"}>Rules</a>
              </li>
          </ul></div>}
      </nav>
    );
  }
}
