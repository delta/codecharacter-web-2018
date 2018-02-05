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

  constructor(props) {
    super(props);
    this.state = {
      activeLink: '/login'
    };
    this.links = [
      {name: 'Login', loginReq: false, onLogin: false},
      {name: 'Signup', loginReq: false, onLogin: false},
      {name: 'Profile', loginReq: true, onLogin: true},
      {name: 'Dashboard', loginReq: true, onLogin: true},
      {name: 'Leaderboard', loginReq: false, onLogin: true},
      {name: 'Matches', loginReq: true, onLogin: true},
      {name: 'Docs', loginReq: false, onLogin: true},
      {name: 'Notifications', loginReq: true, onLogin: true},
    ];
  };

  componentDidMount() {
    this.setState({
      activeLink: window.location.pathname
    });
    const element = document.getElementsByClassName('navbar');
    document.addEventListener('mousedown', function(event) {
      if (element[0] && !element[0].contains(event.target)) {
        document.getElementById('navbarColor02').setAttribute('class', 'collapse navbar-collapse');
      }
    });
  }

  render() {
    let links = (this.links).map((data,index) => {
      let currentLink = false;
      if (("/" + data.name.toLowerCase()) === this.state.activeLink) currentLink = true;

      if (this.props.loginStatus) {
        if (data.onLogin) {
          return (
            <li className="nav-item">
              <Link className={currentLink ? "nav-link active" : "nav-link"} to={"/" + data.name.toLowerCase()}>{data.name}</Link>
            </li>
          );
        }
        else {
          return null;
        }
      }

      else {
        if (!data.loginReq) {
          return (
            <li className="nav-item">
              <Link className={currentLink ? "nav-link active" : "nav-link"} to={"/" + data.name.toLowerCase()}>{data.name}</Link>
            </li>
          );
        }
        else {
          return null;
        }
      }
    });

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
            <ul className="navbar-nav mr-auto" onClick={() => {this.setState({activeLink: window.location.pathname})}} >
              {links}
              <li className="nav-item">
                <span className="nav-link" onClick={() => this.props.onLogout()} style={{cursor: 'pointer'}}>Logout</span>
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
            <ul className="navbar-nav mr-auto"  onClick={() => {this.setState({activeLink: window.location.pathname})}}>
              {links}
            </ul>
          </div>}
      </nav>
    );
  }
}
