import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Link }                                   from 'react-router-dom';

export default class NavbarComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    onLogout: PropTypes.func,
  };

  static defaultProps = {
    loginStatus: false,
    onLogout: () => {},
    codeStatus: 'idle'
  };

  componentDidMount() {
    const element = document.getElementsByClassName('navbar');
    document.addEventListener('mousedown', function(event) {
      if (element[0] && !element[0].contains(event.target)) {
        document.getElementById('navbarColor02').setAttribute('class', 'collapse navbar-collapse');
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', function (event) {

    });
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        style={{paddingTop: 0, paddingBottom: 0, minHeight: 50}}
        ref="navbar"
      >
        <Link
          className="navbar-brand"
          to={"/"}
          style={{fontWeight: 900, color: 'hsla(0,0%,100%,.8)', fontSize: '1.25rem'}}
        >
          Code Character
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="true"
          aria-label="Toggle navigation"
          style={{margin: 5, cursor: 'pointer'}}
        >
          <span className="navbar-toggler-icon"/>
        </button>
        {this.props.loginStatus
          ? <div className="collapse navbar-collapse" id={"navbarColor02"}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/myprofile"}>Profile</Link>
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
                <Link className="nav-link" to={"/rules"}>Docs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/notifications"}>Notifications</Link>
              </li>
              <li className="nav-item" style={{cursor: 'pointer'}}>
                <Link className="nav-link" to={"/"} onClick={() => {this.props.onLogout();}}>Logout</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                  <span
                    className="nav-link"
                    ref={span => {
                      let text = this.props.lastUsed===0 ? this.props.codeStatus : this.props.matchStatus;
                      let color = (text === 'SUCCESS')
                        ? 'lightgreen'
                        : (text === 'ERROR')
                          ? 'red'
                          : (text === 'COMPILING')
                            ? 'lightblue'
                            : (text === 'EXECUTING')
                              ? 'yellow'
                              : 'white';
                      if (span) span.style.setProperty('color',color,'important');
                    }}
                  >{this.props.lastUsed===0 ? this.props.codeStatus : this.props.matchStatus}</span>
                </li>
              </ul>
            </form>
            </div>
          : <div className="collapse navbar-collapse" id={"navbarColor02"}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/rules"}>Docs</Link>
              </li>
          </ul></div>}
      </nav>
    );
  }
}
