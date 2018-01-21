import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Table } from 'react-bootstrap';

export default class NotificationsTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: this.props.notifications
    };
  }

  componentDidMount() {
    console.log(localStorage);
    this.props.getAllNotifications();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.notifications);
    this.setState({
      notifications: nextProps.notifications
    });
  }

  render() {
    return (
      <div>
        {
          this.state.notifications.map((data, index) => {
            return (
              <div className={"alert " + ((data.type==="SUCCESS"?'alert-success':(data.type==="ERROR"?'alert-danger':(data.type==="WARNING"?'alert-success':'alert-info'))))} key={index}>
                <h4 className="alert-heading">{data.title}</h4>
                <p className="mb-0">{data.message}</p>
              </div>
            );
          })
        }
      </div>
    )
  }
}
