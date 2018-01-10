import React from 'react';
import {
  Table
}           from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class ProfileComponent extends React.Component {
  static propTypes = {
    profileData: PropTypes.object,
    getProfileData: PropTypes.func,
    loginStatus: PropTypes.bool
  };

  static defaultProps = {
    profileData: {
      username: '000000000',
      name: 'Gotha Deadpool',
      sex: 'Male',
      nationality: 'Indian',
      address: 'Hare Rama Hare Krishna',
      city: 'Chennai',
      contact: '6969696969',
      college: 'NITT'
    },
    getProfileData: () => {},
    loginStatus: false
  };

  componentWillMount() {
    if(!this.props.loginStatus) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loginStatus) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <Table>
        <tbody>
        <tr>
          <th scope="row">Username</th>
          <td>{this.props.profileData.username}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{this.props.profileData.name}</td>
        </tr>
        <tr>
          <th scope="row">Sex</th>
          <td>{this.props.profileData.sex}</td>
        </tr>
        <tr>
          <th scope="row">Nationality</th>
          <td>{this.props.profileData.nationality}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{this.props.profileData.address}</td>
        </tr>
        <tr>
          <th scope="row">City</th>
          <td>{this.props.profileData.city}</td>
        </tr>
        <tr>
          <th scope="row">Contact</th>
          <td>{this.props.profileData.contact}</td>
        </tr>
        <tr>
          <th scope="row">College</th>
          <td>{this.props.profileData.college}</td>
        </tr>
        </tbody>
      </Table>
    );
  }
}
