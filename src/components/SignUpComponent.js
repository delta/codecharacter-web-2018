import React from 'react';
import { Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import ReactFlagsSelect from 'react-flags-select';
import {findDOMNode} from 'react-dom';
import ReactTooltip from 'react-tooltip';
import 'react-flags-select/css/react-flags-select.css';

export default class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      country: "IN",
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

  onSelectFlag = (countryCode) => {
    this.setState({
      country: countryCode
    });
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
                    <p ref='foo' data-tip='Your Email will not be revealed'/>
                    <input onChange={(event) => {this.updateUsername(event); ReactTooltip.show(findDOMNode(this.refs.foo));}}
                           onBlur={() => ReactTooltip.hide(findDOMNode(this.refs.foo))}
                           type="text"
                           className="form-control"
                           placeholder="Email"
                           id="inputDefault"
                    />
                    <div className="valid-feedback"/>
                  </div>
                <div className={this.nameStatus}>
                  <input onChange={this.updateName} type="text" className='form-control' placeholder="Nickname" id="inputDefault"/>
                </div>
                <div className={this.passwordStatus}>
                  <input onChange={this.updatePassword} type="password" className='form-control' placeholder="Password" id="inputDefault"/>
                  <ReactTooltip />
                </div>
                <div className="form-group" style={{paddingTop: 10, paddingBottom: 10}}>
                  <ReactFlagsSelect defaultCountry="IN" searchable={true} onSelect={this.onSelectFlag}/>
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
