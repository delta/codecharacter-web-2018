import React from 'react';
import PropTypes from 'prop-types';
import { Redirect }                               from 'react-router-dom';

export default class NotificationsTableComponent extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    loginStatus: PropTypes.bool,
    getAllNotifications: PropTypes.func,

  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: this.props.notifications
    };
  }

  componentDidMount() {
    this.props.getAllNotifications();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      notifications: nextProps.notifications
    });
  }

  getClassNameTag = (data) => {
    return (data.type==='SUCCESS'
      ?'alert-success'
      :(data.type==='ERROR'
        ?'alert-danger'
        :(data.type==='WARNING'
          ?'alert-success'
          :'alert-info'
        )
      )
    );
  };

  render() {
    if (!this.props.loginStatus) {
      return <Redirect to={'/login'}/>;
    }

    return (
      <div>
        {
          this.state.notifications.map((data, index) => {
            return (
              <div className={'alert ' + this.getClassNameTag(data)} key={index}>
                <h4 className='alert-heading'>{data.title}</h4>
                <p className='mb-0'>{data.message}</p>
              </div>
            );
          })
        }
      </div>
    )
  }
}
