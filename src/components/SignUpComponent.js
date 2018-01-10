import React          from 'react';
import {
  Modal
}                     from 'react-bootstrap';

export default class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
    };
    this.usernameStatus = 'form-group';
    this.passwordStatus = 'form-group';
    this.nameStatus = 'form-group';
  }

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
    this.props.userSignup(this.state.username, this.state.name, this.state.password);
  };

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog style={{position: 'static'}}>
          <div className='modal-content'>
            <Modal.Header>
              <Modal.Title>
                Create a new account
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className={this.usernameStatus}>
                <input onChange={this.updateUsername} type="text" className="form-control" placeholder="Username" id="inputDefault"/>
              </div>
              <div className={this.nameStatus}>
                <input onChange={this.updateName} type="text" className='form-control' placeholder="Name" id="inputDefault"/>
              </div>
              <div className={this.passwordStatus}>
                <input onChange={this.updatePassword} type="password" className='form-control' placeholder="Password" id="inputDefault"/>
              </div>
            </Modal.Body>

            <Modal.Footer
            >
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.handleSubmit}
              >
                SIGN UP
              </button>
              <button onClick={() => this.props.history.push('/login')} type='button' className="btn btn-secondary">LOG IN</button>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
      </div>
    );
  }
}
