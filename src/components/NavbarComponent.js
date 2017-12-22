import React          from 'react';

export default class NavbarComponent extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark customNavbar">
        <a className="navbar-brand" href="#">Code Character</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">Home </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">About</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-danger customNavbarButton" type="submit">Sign Out</button>
          </form>
        </div>
      </nav>
    );
  }
}
