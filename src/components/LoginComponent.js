import React          from 'react';
import {
  Modal,
  Button,
  FormGroup,
}                     from 'react-bootstrap';
import { Redirect }                   from 'react-router';
import PropTypes      from 'prop-types';

export default class LoginComponent extends React.Component {

  static propTypes = {
    loginStatus: PropTypes.bool,
    loginMessage: PropTypes.string,
    username: PropTypes.string,
    authenticate: PropTypes.func,
    redirectToHome: PropTypes.func
  };

  static defaultProps = {
    loginStatus: false,
    usernameStatus: '',
    passwordStatus: '',
    usernameMessage: '',
    passwordMessage: '',
    username: '',
    authenticate: () => {},
    redirectToHome: () => {}
  };

  // Constructor assigning state
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameStatus: 'form-group',
      passwordStatus: 'form-group',
      usernameMessage: '',
      passwordMessage: ''
    };
  }

  componentDidMount() {
    this.updateLoginMessages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateLoginMessages(nextProps);
  };

  updateLoginMessages = (props) => {
    if (props.loginMessage === "User doesn't exist!") {
      this.setState({
        usernameStatus: 'form-group has-danger',
        passwordStatus: 'form-group',
        usernameMessage: props.loginMessage,
        passwordMessage: ''
      });
    }
    else if (props.loginMessage === "Wrong Password!") {
      this.setState({
        usernameStatus: 'form-group',
        passwordStatus: 'form-group has-danger',
        usernameMessage: '',
        passwordMessage: props.loginMessage
      });
    }
    else if (props.loginMessage === "Logged in!") {
      this.setState({
        usernameStatus: 'form-group has-success',
        passwordStatus: 'form-group has-success',
        usernameMessage: '',
        passwordMessage: props.loginMessage
      });
    }
    else {
      this.setState({
        usernameStatus: 'form-group',
        passwordStatus: 'form-group',
        usernameMessage: '',
        passwordMessage: ''
      });
    }
  };

  // Function to update state with the entered username
  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  // Function to update state with the entered password
  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  // Function to submit the credentials on submit button click
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authenticate(this.state.username, this.state.password);
  };

  // Rendering Function
  render() {
    return (
      <div className='static-modal'>
        <Modal.Dialog>
          <div className='modal-content'>
            <Modal.Header>
              <Modal.Title>
                Login to CodeCharacter
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className='loginModalBody'>
              <FormGroup className={this.state.usernameStatus} style={{paddingTop: 20, paddingBottom: 10}}>
                <input onChange={this.updateUsername} type='text' className='form-control is-invalid' placeholder='Username' id='inputDefault'/>
                <div className="invalid-feedback">{this.state.usernameMessage}</div>
              </FormGroup>
              <FormGroup className={this.state.passwordStatus} style={{paddingTop: 10, paddingBottom: 20}}>
                <input onChange={this.updatePassword} type='password' className='form-control is-invalid' placeholder='Password' id='inputDefault'/>
                <div className="invalid-feedback">{this.state.passwordMessage}</div>
              </FormGroup>
            </Modal.Body>

            <Modal.Footer
            >
              <Button
                className='btn btn-primary'
                bsStyle='primary'
                onClick={this.handleSubmit}
              >
                LOG IN
              </Button>
              <Button className='btn btn-secondary'>Sign Up</Button>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
        {this.props.loginStatus ? <Redirect to="/dashboard" /> : null}
      </div>
    );
  }
}

