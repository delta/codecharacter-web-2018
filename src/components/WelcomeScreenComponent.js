import React from 'react';
import { Link } from 'react-router-dom';
// import homeVideo from '../../public/home.webm';

export default class WelcomeScreenComponent extends React.Component {
  render() {
    return (
      <div>
        <section className="hero" style={{padding: 0, zIndex: 10}}>
          <div className="container" style={{position: 'absolute', zIndex: 10, maxWidth: 1800}}>
            <div className="row d-md-flex brand" style={{width: '100%', paddingTop: 50}}>
              <div className="col-md-12 col-sm-12 text-white" style={{position: 'absolute', width: '100%'}}>
                <h2 className="pt-4" style={{fontSize: 45, zIndex: 100, textShadow: '6px 6px 20px #000000', textAlign: 'center'}}>CODE CHARACTER</h2>
                <p className="mt-5" style={{zIndex: 100, textShadow: '2px 2px 20px #000000', textAlign: 'center'}}>
                  The Online AI Challenge
                </p>
                <p className="mt-5" style={{textAlign: 'center'}}>
                  <Link to={"/login"} className="btn btn-white mr-2 mb-2 page-scroll">Log In</Link>
                  <Link to={"/signup"} className="btn btn-white mb-2 page-scroll">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white p-0">
          <div className="container-fluid">
            <div className="row d-md-flex mt-5">
              <div className="col-sm-6 p-0 wow fadeInLeft">
                <img className="img-fluid" src="/assets/dashboardView.png" alt="Gallery" style={{marginTop: '10%', padding: 10}}/>
              </div>
              <div className="col-sm-6 pl-5 pr-5 pt-5 pb-4 wow fadeInRight">
                <h1>ABOUT</h1>
                <p className="lead pt-4">Code Character is an online AI prgramming competition, where you write C++ code for a real time strategy game. </p><p className="lead pt-4"> Test your code against yourself, against the computer, and then against everyone else! Challenge others to improve your rating as you climb up the leaderboard!</p>
                <ul className="pt-4 pb-3 list-default">
                  <li>Integrated code editor and development environment</li>
                  <li>View your AI playing itself!</li>
                  <li>Live leaderboard, challenge anyone.</li>
                  <li>Active discussion forum for any game related questions</li>
                  <li>Extensive tutorials and documentation</li>
                  <li>Exciting prizes!</li>
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
                  <li><h5>Do I need to know C++ to participate?</h5><p>Yes, some basic knowledge of C++ is definitely required. If you have an understanding of structs, arrays, pointers, and perhaps the STL library, you should be good to go.</p></li>
                  <li><h5>Do I need to set up the environment on my local machine to code?</h5><p>Not at all. You can compile and run your code directly in the integrated editor.</p></li>
                  <li><h5>Is the event completely online?</h5><p>Yes! Code Character is played completely on the web.</p></li>
                  <li><h5>How do I participate?</h5><p>Simply follow the signup link and you'll be on your way!</p></li>
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
                Made with <Link to="https://delta.nitt.edu" target="_blank">&hearts;</Link> by <Link to="https://delta.nitt.edu" target="_blank">Delta Force</Link>
            </h4>
            </div>
          </div>
        </div>
    </section>
      </div>
    );
  }
}
