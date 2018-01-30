import React from 'react';

export default class ProfileViewComponent extends React.Component {

  componentWillMount() {
    console.log(this.props.match.params.name);
    this.props.getProfileViewData(this.props.match.params.name);
  }

  render() {
    console.log(this.props.profileViewData);
    return null;
  }

}
