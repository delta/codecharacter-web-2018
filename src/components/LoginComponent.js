import React          from 'react';
import {
  Modal,
  Button,
  FormGroup,
}                     from 'react-bootstrap';
import PropTypes      from 'prop-types';

export default class LoginComponent extends React.Component {

  static propTypes = {
    usernameStatus: PropTypes.string,
    passwordStatus: PropTypes.string,
    usernameMessage: PropTypes.string,
    passwordMessage: PropTypes.string,
    username: PropTypes.string,
    authenticate: PropTypes.func,
    redirectToHome: PropTypes.func,
  };

  static defaultProps = {
    usernameStatus: '',
    passwordStatus: '',
    usernameMessage: '',
    passwordMessage: '',
    username: '',
    authenticate: () => {},
    redirectToHome: () => {},
  };

  // Constructor assigning state
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.passwordStatus = 'form-group';
    this.usernameStatus = 'form-group';
  }

  componentDidMount() {
    if (this.props.loginStatus) {
      this.history.push('/home');
    }
  }

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
              <FormGroup className={this.props.usernameStatus} style={{paddingTop: 20, paddingBottom: 10}}>
                <input onChange={this.updateUsername} type='text' className='form-control is-invalid' placeholder='Username' id='inputDefault'/>
                <div className="invalid-feedback">{this.props.usernameMessage}</div>
              </FormGroup>
              <FormGroup className={this.props.passwordStatus} style={{paddingTop: 10, paddingBottom: 20}}>
                <input onChange={this.updatePassword} type='password' className='form-control is-invalid' placeholder='Password' id='inputDefault'/>
                <div className="invalid-feedback">{this.props.passwordMessage}</div>
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
      </div>
    );
  }
}

