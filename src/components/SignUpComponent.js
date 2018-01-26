import React                                      from 'react';
import {
  Modal,
  Form
}                                                 from 'react-bootstrap';
import { Link }                                   from 'react-router-dom';
import Recaptcha                                  from 'react-recaptcha';

export default class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      verified: false,
      captchaMessage: ''
    };
    this.usernameStatus = 'form-group';
    this.passwordStatus = 'form-group';
    this.nameStatus = 'form-group';
  }

  verifyCallback = () => {
    this.setState({
      verified: true
    });
  };

  updateUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  updateName = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  updatePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = () => {
    if(this.state.verified) {
      this.props.userSignup(this.state.username, this.state.name, this.state.password);
    }
    else {
      this.setState({
        captchaMessage: 'Verify Captcha'
      });
    }
  };

  render() {
    return (
      <div className="static-modal" style={{height: window.innerHeight - 50, backgroundColor: '#01848F'}}>
        <Form>
          <Modal.Dialog style={{position: 'static'}}>
            <div className='modal-content'>
              <Modal.Header>
                <Modal.Title>
                  Create a new account
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={this.usernameStatus}>
                  <input onChange={this.updateUsername} type="text" className="form-control" placeholder="Email" id="inputDefault"/>
                </div>
                <div className={this.nameStatus}>
                  <input onChange={this.updateName} type="text" className='form-control' placeholder="Nickname" id="inputDefault"/>
                </div>
                <div className={this.passwordStatus}>
                  <input onChange={this.updatePassword} type="password" className='form-control' placeholder="Password" id="inputDefault"/>
                </div>
                <div style={{margin: '0 auto'}} className="form-group">
                  <Recaptcha verifyCallback={() => this.verifyCallback()} sitekey="6Le3mUEUAAAAALnINa5lXeoXmYUuYYsLOEA5mcTi"/>
                  <div style={{color: 'red'}}>{this.state.captchaMessage}</div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className='btn btn-primary' type='submit' onClick={this.handleSubmit}>SIGN UP</button>
              </Modal.Footer>
              <p style={{textAlign: 'right', paddingRight: 20}} >Existing user?<Link to={'/login'}> Login </Link></p>
            </div>
          </Modal.Dialog>
        </Form>
      </div>
    );
  }
}
