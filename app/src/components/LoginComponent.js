import React          from 'react';

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
      <div id="loginWrapper" style={styles.loginWrapper}>
        <div>
          <input type="text" onChange={this.updateUsername}/>
          <input type="password" onChange={this.updatePassword}/>
          <input type="submit" onClick={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

let styles = {
  loginWrapper: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  }
};


//("#697784","#4E5C66")
