import React          from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
}                     from 'react-bootstrap';
import PropTypes      from 'prop-types';

export default class LoginComponent extends React.Component {

  static propTypes = {
    loginStatus: PropTypes.bool,
    username: PropTypes.string,
    message: PropTypes.string,
    authenticate: PropTypes.func,
    redirectToHome: PropTypes.func,
  };

  static defaultProps = {
    loginStatus: true,
    username: '000000000',
    message: '',
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
      <div className="static-modal">
        <Modal.Dialog>
          <div className='modal-content'>
            <Modal.Header>
              <Modal.Title>
                Login to your account
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className={this.usernameStatus}>
                  <input onChange={this.updateUsername} type="text" className="form-control" placeholder="Username" id="inputDefault"/>
              </div>
              <div className={this.passwordStatus}>
                <input onChange={this.updatePassword} type="password" className='form-control' placeholder="Password" id="inputDefault"/>
              </div>
            </Modal.Body>

            <Modal.Footer
            >
              <Button
                className='btn btn-primary'
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                LOG IN
              </Button>
              <Button className="btn btn-secondary">Sign Up</Button>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
      </div>
    );
  }
}

