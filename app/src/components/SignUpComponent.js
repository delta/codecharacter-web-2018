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

  
  render() {
    return (
      <div>
        <Input type="email" onChange={this.changeEmailId}/>
        <Input type="text" onChange={this.changeName}/>
        <Input type="password" onChange={this.changePassword}/>
        <Input type="submit" />
      </div>
    );
  }
}
