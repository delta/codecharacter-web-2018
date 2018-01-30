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
      passwordMessage: '',
      usernameError: false,
      passwordError: false
    };
  }

  componentDidMount() {
    this.props.authenticateCheck();
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
        passwordMessage: '',
        usernameError: true,
        passwordError: false
      });
    }
    else if (props.loginMessage === 'Wrong Password!') {
      this.setState({
        usernameStatus: 'form-group',
        passwordStatus: 'form-group has-danger',
        usernameMessage: '',
        passwordMessage: props.loginMessage,
        usernameError: false,
        passwordError: true
      });
    }
    else if (props.loginMessage === 'Logged in!') {
      this.setState({
        usernameStatus: 'form-group ',
        passwordStatus: 'form-group ',
        usernameMessage: '',
        passwordMessage: props.loginMessage,
        usernameError: false,
        passwordError: false
      });
    }
    else if (props.loginMessage === 'Pass proper params') {
      this.setState({
        usernameStatus: 'form-group has-danger',
        passwordStatus: 'form-group has-danger',
        usernameMessage: 'Fill all Fields',
        passwordMessage: '',
        usernameError: true,
        passwordError: false
      });
    }
    else {
      this.setState({
        usernameStatus: 'form-group',
        passwordStatus: 'form-group',
        usernameMessage: '',
        passwordMessage: props.loginMessage,
        usernameError: false,
        passwordError: true
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
      return <Redirect to='/dashboard'/>
    }
    return (
      <div className='static-modal' style={{height: window.innerHeight - 50, backgroundColor: '#01848F'}}>
        <Form>
        <Modal.Dialog style={{position: 'static'}}>
          <div className='modal-content'>
            <Modal.Header>
              <Modal.Title>
                Login to CodeCharacter
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className='loginModalBody'>
              <p style={{paddingRight: 20, fontSize: 14}}>Already registered on <Link to="https://www.pragyan.org/18/home" target='_blank'>Pragyan</Link> or NITT Webmail? You can use the same credentials to login.</p>
              <FormGroup className={this.state.usernameStatus} style={{paddingTop: 20, paddingBottom: 10}}>
                <input onChange={this.updateUsername} type='text' className={(this.state.usernameError)?'form-control is-invalid':'form-control'} placeholder='Email'/>
                <div className='invalid-feedback'>{this.state.usernameMessage}</div>
              </FormGroup>
              <FormGroup className={this.state.passwordStatus} style={{paddingTop: 10, paddingBottom: 20}}>
                <input onChange={this.updatePassword} type='password' className={(this.state.passwordError)?'form-control is-invalid':'form-control'} placeholder='Password'/>
                <div className='invalid-feedback'>{this.state.passwordMessage}</div>
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button className='btn-primary' bsStyle='primary' type="submit" style={{cursor: 'pointer'}} onClick={this.handleSubmit}>
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

