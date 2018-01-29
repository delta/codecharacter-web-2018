import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Notification }                           from 'react-pnotify';

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

  static defaultProps = {
    notifications: [],
    loginStatus: false,
    lastUsed: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      index: 0
    }
  };

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.notifications) !== JSON.stringify(this.props.notifications)) {
      this.addNotifications(nextProps.notifications);
    }
  }

  addNotifications = (notifications) => {

    let notifyDomElements = [];

    for(let i=0;i< notifications.length;i++) {
      let index = this.state.index;
      let notify = <Notification
        type={notifications[i].type==="SUCCESS"?'success':(notifications[i].type==="ERROR"?'error':(notifications[i].type==="WARNING"?'notice':(notifications[i].type==="INFORMATION"?'info':'info')))}
        title={notifications[i].title}
        text= {notifications[i].message}
        delay={4000}
        shadow={true}
        hide={true}
        nonblock={false}
        desktop={false}
        key={index}
      />;
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
    return <div>
      {this.state.notifications}
    </div>
  }
}
