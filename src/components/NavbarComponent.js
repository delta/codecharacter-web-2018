import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import {
  Navbar,
  NavItem
}                                                 from 'react-bootstrap';
import { LinkContainer }                          from 'react-router-bootstrap';

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
      <Navbar className='navbar-expand-lg navbar-dark bg-dark' style={{height: 50}}>
        <Navbar.Header style={{paddingTop: 22}}>
          <Navbar.Brand>
            <LinkContainer to='/login' style={{color: 'white'}}><p>Code Character</p></LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse className='collapse' id='navbarColor02'>
          {this.props.loginStatus
            ? <ul className="navbar-nav mr-auto" style={{paddingTop: 10}}>
              <NavItem>
                <LinkContainer to='/profile' className="nav-link"><p>Profile</p></LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to='/dashboard' className="nav-link"><p>Dashboard</p></LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to='/leaderboard' className="nav-link"><p>Leaderboard</p></LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to='/matches' className="nav-link"><p>Matches</p></LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to='/rules' className="nav-link"><p>Rules</p></LinkContainer>
              </NavItem>
            </ul>
            : <ul className="navbar-nav mr-auto" style={{paddingTop: 10}}>
              <NavItem>
                <LinkContainer to='/login' className="nav-link"><p>Login</p></LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to='/signup' className="nav-link"><p>Signup</p></LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to='/rules' className="nav-link"><p>Rules</p></LinkContainer>
              </NavItem>
            </ul>}
        </Navbar.Collapse>
          {this.props.loginStatus ? <Navbar.Form>
            <button
              className="btn btn-secondary"
              style={{borderRadius: 0, height: 50, paddingTop: -10}}
              onClick={() => {this.props.onLogout();}}
            >
              Log Out
            </button>
          </Navbar.Form> : null}
      </Navbar>
    );
  }
}
