import React          from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
}                     from 'react-bootstrap';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

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
    return (
      <div className="static-modal">
        <Modal.Dialog
          style={{
            backgroundColor: '#232733',
            display: 'block',
            position: 'absolute',
            width: 400,
            height: 550,
          }}
        >
          <Modal.Header
            style={{
              height: 40,
              marginTop: 100,
              paddingLeft: 50
            }}
          >
            <Modal.Title style={{color: '#AAA', fontSize: 18, fontFamily: 'Roboto', fontWeight: 8}}>Login to your account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                style={{
                  backgroundColor: 'red'
                }}
              >
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Username"
                  style={{
                    width: "100%",
                    height: 35,
                    border: 'none'
                  }}
                />
              </FormGroup>
              <FormGroup
                controlId="formBasicText"
                style={{
                  backgroundColor: 'red'
                }}
              >
                <FormControl
                  type="password"
                  value={this.state.value}
                  placeholder="Password"
                  style={{
                    width: "100%",
                    height: 35,
                    border: 'none'
                  }}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary">Submit</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}



//("#697784","#4E5C66")
