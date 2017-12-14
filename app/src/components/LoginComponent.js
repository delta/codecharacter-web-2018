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
      <div className="static-modal" style={this.styles.wrapper}>
        <Modal.Dialog style={this.styles.dialog} className='modalDialog'>
          <Modal.Header style={this.styles.header}>
            <Modal.Title style={this.styles.title}>
              Login to your account
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={this.styles.body}>
            <form>
              <FormGroup
                controlId="formBasicText"
                style={this.styles.formGroup}
              >
                <FormControl
                  type="text"
                  placeholder='Username'
                  className='loginField'
                  onChange={this.updateUsername}
                />
              </FormGroup>
              <FormGroup
                controlId="formBasicText"
                style={this.styles.formGroup}
              >
                <FormControl
                  type="password"
                  placeholder="Password"
                  className='loginField'
                  onChange={this.updatePassword}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer
            style={this.styles.footer}
          >
            <Button
              bsStyle="primary"
              className='loginSubmitButton'
              onClick={this.handleSubmit}
            >
              LOG IN
            </Button>
          </Modal.Footer>
          <div style={this.styles.div}>
            <p style={this.styles.p}>
              {this.props.message}
            </p>
          </div>
        </Modal.Dialog>
      </div>
    );
  }

  // Styles for components in Render() [Some CSS has been written in loginStyles.css in app/public]
  styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(blue, violet)',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      paddingTop: "2%"
    },

    dialog: {
      backgroundColor: '#232733',
       position: 'absolute',
      width: 400,
      height: 550,
    },

    header: {
      height: 40,
      marginTop: 130,
      paddingLeft: 40
    },

    title: {
      color: '#AAA',
      fontSize: 18,
      fontFamily: 'Roboto',
      fontWeight: 8
    },

    body: {
      marginTop: 20,
    },

    formGroup: {
      backgroundColor: 'red'
    },
    footer: {
      marginTop: "15%",
      height: 40,
    },

    div: {
      marginTop: 90,
      position: 'relative',
      paddingLeft: 40
    },

    p: {
      fontFamily: 'Roboto',
      fontSize: 15,
      color: '#AAA'
    }

  };
}

