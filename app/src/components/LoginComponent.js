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
      <div>
        <input type="text" onChange={this.updateUsername}/>
        <input type="password" onChange={this.updatePassword}/>
        <input type="submit" onClick={this.handleSubmit}/>
      </div>
    );
  }
}
