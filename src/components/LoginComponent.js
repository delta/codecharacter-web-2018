import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router-dom';
import { Link }                                   from 'react-router-dom';
import {
  Modal,
  Button,
  FormGroup,
  Form
}                                                 from 'react-bootstrap';

export default class LoginComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    loginMessage: PropTypes.string,
    authenticate: PropTypes.func,
  };

  static defaultProps = {
    loginStatus: false,
    loginMessage: '',
    authenticate: () => {},
  };

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
    this.props.authenticateCheck(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    this.updateLoginMessages(nextProps);
  }

  updateLoginMessages = (props) => {
    if (props.loginMessage === 'User doesn\'t exist!') {
      this.setState({
        usernameStatus: 'form-group has-danger',
        passwordStatus: 'form-group',
        usernameMessage: props.loginMessage,
        passwordMessage: ''
      });
    }
    else if (props.loginMessage === 'Wrong Password!') {
      this.setState({
        usernameStatus: 'form-group',
        passwordStatus: 'form-group has-danger',
        usernameMessage: '',
        passwordMessage: props.loginMessage
      });
    }
    else if (props.loginMessage === 'Logged in!') {
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

  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authenticate(this.state.username, this.state.password);
  };

  render() {
    if (this.props.loginStatus) {
      console.log("Redirecting Here");
      return <Redirect to='/dashboard'/>
    }
    return (
      <div className='static-modal'>
        <Form>
        <Modal.Dialog style={{position: 'static'}}>
          <div className='modal-content'>
            <Modal.Header>
              <Modal.Title>
                Login to CodeCharacter
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className='loginModalBody'>
              <FormGroup className={this.state.usernameStatus} style={{paddingTop: 20, paddingBottom: 10}}>
                <input onChange={this.updateUsername} type='text' className='form-control is-invalid' placeholder='Username'/>
                <div className='invalid-feedback'>{this.state.usernameMessage}</div>
              </FormGroup>
              <FormGroup className={this.state.passwordStatus} style={{paddingTop: 10, paddingBottom: 20}}>
                <input onChange={this.updatePassword} type='password' className='form-control is-invalid' placeholder='Password'/>
                <div className='invalid-feedback'>{this.state.passwordMessage}</div>
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button className='btn-primary' bsStyle='primary' type="submit" onClick={this.handleSubmit}>
                LOG IN
              </Button>
            </Modal.Footer>
            <p style={{textAlign: 'right', paddingRight: 20}}>New user?<Link to={'/signup'}> Sign Up </Link></p>
          </div>
        </Modal.Dialog>
        </Form>
      </div>
    );
  }
}

