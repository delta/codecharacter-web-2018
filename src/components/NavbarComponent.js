import React                  from 'react';
import {
  Navbar,
  Nav,
  NavItem,
}                             from 'react-bootstrap';
import PropTypes              from 'prop-types';
import { Link }               from 'react-router-dom';

export default class NavbarComponent extends React.Component {
  static propTypes = {
    onLogout: PropTypes.func
  };

  render() {
    return (
      <Navbar className='navbar-expand-lg navbar-dark bg-dark' style={{height: 50}}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' style={{color: 'white'}}>Code Character</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className='collapse navbar-collapse' id='navbarColor02'>
          <ul className="navbar-nav mr-auto">
            <NavItem className=" active">
              <Link to='/dashboard' className="nav-link">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to='/leaderboard' className="nav-link">Leaderboard</Link>
            </NavItem>
            <NavItem>
              <Link to='/matches' className="nav-link">Matches</Link>
            </NavItem>
          </ul>
          <Navbar.Form>
            <button
              className="btn btn-secondary"
              style={{borderRadius: 0, height: 50}}
              onClick={() => this.props.onLogout()}
            >
              Log Out
            </button>
          </Navbar.Form>
        </Nav>
      </Navbar>
    );
  }
}
