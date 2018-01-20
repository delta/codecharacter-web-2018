import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'react-pnotify';

export default class NotificationComponent extends React.Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(
      PropTypes.shape({
        read: PropTypes.bool,
        status: PropTypes.string,
        message: PropTypes.string
      })
    ),
    loginStatus: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      index: 0
    }
  };

  componentDidMount() {
    console.log(this.props.notifications);
    this.codeStatus = setInterval(() => this.props.getCodeStatus(), 500);
    if(this.props.loginStatus) {
      this.setInterval = setInterval(() => {if(this.state.index < (this.props.notifications).length) this.addNotification()}, 2000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loginStatus) {
      clearTimeout(this.setInterval);
    }
    else {
      if(!this.setInterval) {
        this.setInterval = setInterval(() => {if(this.state.index < (this.props.notifications).length) this.addNotification()}, 2000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.setInterval);
    clearInterval(this.codeStatus);
  }

  addNotification = () => {
    let notify = <Notification
      type='info'
      title='Info example'
      text= {this.props.notifications[this.state.index].message}
      animateIn='slideInDown'
      animateOut='slideOutUp'
      delay={4000}
      shadow={true}
      hide={true}
      nonblock={false}
      desktop={false}
      key={this.state.index}
    />;

    this.setState({
      index: this.state.index+1
    });
    let notifications = this.state.notifications;
    notifications.push(notify);
    this.setState({
      notifications: notifications
    });
  };

  render() {
    return <div>{this.state.notifications}</div>
  }
}
