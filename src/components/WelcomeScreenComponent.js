import React from 'react';
import { Link } from 'react-router-dom';
// import homeVideo from '../../public/home.webm';

export default class WelcomeScreenComponent extends React.Component {
  render() {
    return (
      <div>
        <section className="hero" style={{padding: 0, zIndex: 10, backgroundColor: 'black'}}>
          <div className="container" style={{position: 'absolute', zIndex: 10, maxWidth: 1800}}>
            <div className="row d-md-flex brand" style={{width: '100%', paddingTop: 50}}>
              <div className="col-md-12 col-sm-12 text-white" style={{position: 'absolute', width: '100%'}}>
                <h2 className="pt-4" style={{fontSize: 45, zIndex: 100, textShadow: '6px 6px 20px #000000', textAlign: 'center'}}>CODE CHARACTER!</h2>
                <p className="mt-5" style={{zIndex: 100, textShadow: '2px 2px 20px #000000', textAlign: 'center'}}>
                  The Coding Game to challenge yourself and everyone.
                </p>
                <p className="mt-5" style={{textAlign: 'center'}}>
                  <Link to={"/login"} className="btn btn-white mr-2 mb-2 page-scroll">Log In</Link>
                  <Link to={"/signup"} className="btn btn-white mb-2 page-scroll">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
          <div style={{width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.5, position: 'absolute'}}/>
          <video autoplay="autoplay" src='/home.webm' style={{width: '100%', height: '100%'}}/>
        </section>
        <section className="bg-white p-0">
          <div className="container-fluid">
            <div className="row d-md-flex mt-5">
              <div className="col-sm-6 p-0 wow fadeInLeft">
                <img className="img-fluid" src="../img/product2.jpg" alt="Gallery"/>
              </div>
              <div className="col-sm-6 pl-5 pr-5 pt-5 pb-4 wow fadeInRight">
                <h1>ABOUT</h1>
                <p className="lead pt-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                <ul className="pt-4 pb-3 list-default">
                  <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                  <li>Aenean commodo ligula eget dolor.</li>
                  <li>Aenean massa.</li>
                  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                  <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                  <li>Aenean commodo ligula eget dolor.</li>
                  <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                </ul>
                <Link to={"/signup"} className="btn btn-primary mr-2 page-scroll">Get Started</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-0">
          <div className="container-fluid">
            <div className="row d-md-flex mt-5">
              <div className="col-sm-12 pl-5 pr-5 pt-5 pb-4">
                <h1>FAQ</h1>
                <ul className="pt-4 pb-3 list-default">
                  <li><h5>What is the game Called?</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p></li>
                  <li><h5>What is the game Called?</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p></li>
                  <li><h5>What is the game Called?</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p></li>
                  <li><h5>What is the game Called?</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p></li>
                  <li><h5>What is the game Called?</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

    <section className="bg-footer" id="connect" style={{padding: 20}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12 text-center wow fadeIn">
            <h4 className="pt-2 text-muted">
                Made with &hearts; by Delta
            </h4>
            </div>
          </div>
        </div>
    </section>
      </div>
    );
  }
}
