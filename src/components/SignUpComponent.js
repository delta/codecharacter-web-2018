import React from 'react';
import { Form, Modal, OverlayTrigger, Tooltip, FormGroup } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
// import Recaptcha from 'react-recaptcha';
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
      captchaMessage: '',
      errorMessage: '',
      signedUp: false
    };
    this.usernameStatus = '';
    this.passwordStatus = '';
    this.nameStatus = '';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signupMessage !== this.props.signupMessage) {
      this.setState({
        errorMessage: nextProps.signupMessage
      });
      this.updateStatus(nextProps.signupMessage);
    }
  }

  updateStatus = (message) => {
    if (message === "Please fill all the required details") {
      this.usernameStatus = "";
      this.nameStatus = "";
      this.passwordStatus = "is-invalid";
      this.setState({
        verified: false
      });
    }
    else if (message === "The email/username combination already exists!") {
      this.usernameStatus = "";
      this.nameStatus = "is-invalid";
      this.passwordStatus = "";
      this.setState({
        verified: false
      });
    }
    else if (message === "User signedup!") {
      this.props.addNotifications([{
        type: 'SUCCESS',
        title: 'Signed Up',
        message: 'You have successfully signed up.',
        createdAt: Date.now().toString()
      }]);
      this.setState({
        signedUp: true
      });
    }
  };

  verifyCallback = () => {
    console.log("Verified");
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

  handleSubmit = (event) => {
    event.preventDefault();
      this.props.userSignup(this.state.username, this.state.name, this.state.password, this.state.country);
    };

  onSelectFlag = (countryCode) => {
    this.setState({
      country: countryCode
    });
  };

  render() {

    if (this.state.signedUp) {
      return <Redirect to="/login"/>
    }

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
                  <FormGroup className={this.usernameStatus}>
                    <p ref='foo' data-tip='Your Email will not be revealed'/>
                    <input onChange={(event) => {this.updateUsername(event); ReactTooltip.show(findDOMNode(this.refs.foo));}}
                           onBlur={() => ReactTooltip.hide(findDOMNode(this.refs.foo))}
                           type="text"
                           className={"form-control " + this.usernameStatus}
                           placeholder="Email"
                           id="inputDefault"
                    />
                    <div className="invalid-feedback">{this.state.errorMessage}</div>
                  </FormGroup>
                <FormGroup>
                  <input onChange={this.updateName} type="text" className={"form-control " + this.nameStatus} placeholder="Nickname" id="inputDefault"/>
                  <div className="invalid-feedback">{this.state.errorMessage}</div>
                </FormGroup>
                <FormGroup>
                  <input onChange={this.updatePassword} type="password" className={"form-control " + this.passwordStatus} placeholder="Password" id="inputDefault"/>
                  <div className="invalid-feedback">{this.state.errorMessage}</div>
                  <ReactTooltip />
                </FormGroup>
                <div className="form-group" style={{paddingTop: 10, paddingBottom: 10}}>
                  <ReactFlagsSelect defaultCountry="IN" searchable={true} onSelect={this.onSelectFlag}/>
                </div>
                <div style={{margin: '0 auto'}} className="form-group">
                  {/*<Recaptcha verifyCallback={() => console.log("Verified")} sitekey="6Le3mUEUAAAAALnINa5lXeoXmYUuYYsLOEA5mcTi"/>*/}
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
