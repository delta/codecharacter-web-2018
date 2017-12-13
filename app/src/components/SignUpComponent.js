import React          from 'react';

export default class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      name: "",
      password: "",
    };
  }

  changeEmailId = (e) => {
    this.setState({
      emailId: e.target.value
    });
  };

  changeName = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  changePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = () => {
    console.log("Here");
    console.log("Here");
    this.props.userSignup(this.state.emailId, this.state.name, this.state.password);
  };

  render() {
    return (
      <div>
        <input type="email" onChange={this.changeEmailId}/>
        <input type="text" onChange={this.changeName}/>
        <input type="password" onChange={this.changePassword}/>
        <input type="submit" onClick={this.handleSubmit}/>
      </div>
    );
  }
}
