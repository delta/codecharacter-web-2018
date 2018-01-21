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
    lastUsed: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      index: 0
    }
  };

  componentDidMount() {
    this.codeStatus = setInterval(() => {this.props.getCodeStatus(); this.props.getLatestMatchId(); this.props.getMatchStatus(this.props.matchId); this.props.getUnreadNotifications();}, 500);
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps.notifications) !== JSON.stringify(this.props.notifications));
    if (JSON.stringify(nextProps.notifications) !== JSON.stringify(this.props.notifications)) {
      console.log(nextProps.notifications);
      console.log("Gonna Update Notifications");
      this.addNotifications(nextProps.notifications);
    }
  }

  componentWillUnmount() {
    clearInterval(this.codeStatus);
  }

  addNotifications = (notifications) => {

    let notifyDomElements = [];

    for(let i=0;i< notifications.length;i++) {
      let index = this.state.index;
      let notify = <Notification
        type={notifications[i].type==="SUCCESS"?'success':(notifications[i].type==="ERROR"?'error':(notifications[i].type==="WARNING"?'notice':(notifications[i].type==="INFORMATION"?'info':'info')))}
        title={notifications[i].title}
        text= {notifications[i].message}
        animateIn='slideInDown'
        animateOut='slideOutUp'
        delay={4000}
        shadow={true}
        hide={true}
        nonblock={false}
        desktop={false}
        key={index}
      />;
      console.log(index);
      notifyDomElements.push(notify);
      this.setState({
        index: index+1
      });
    }

    this.setState({
      notifications: notifyDomElements,
    });
  };

  render() {
    return <div>{this.state.notifications}</div>
  }
}
