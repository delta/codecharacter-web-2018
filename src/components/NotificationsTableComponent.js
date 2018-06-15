import React from 'react';
import PropTypes from 'prop-types';
import { Redirect }                               from 'react-router-dom';

export default class NotificationsTableComponent extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    loginStatus: PropTypes.bool,
    isFetching: PropTypes.bool,
    getAllNotifications: PropTypes.func,
    userAuthenticateCheck: PropTypes.func,
    deleteNotification: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: this.props.notifications
    };
  }

  componentDidMount() {
    this.props.userAuthenticateCheck();
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
        { !this.props.isFetching
          ? (this.state.notifications && this.state.notifications.length !== 0
          ? this.state.notifications.slice(0).reverse().map((data, index) => {
            let date = new Date(data.createdAt);
            return (
              <div className={'alert alert-dismissible ' + this.getClassNameTag(data)} key={index}>
                <button type="button" className="close" data-dismiss="alert" style={{cursor: 'pointer'}} onClick={() => this.props.deleteNotification(data.id)} >&times;</button>
                <h4 className='alert-heading'>{data.title}</h4>
                  <p className='mb-0' dangerouslySetInnerHTML={{__html: data.message}}></p>
                <br/>
                <h6 className='mb-1'>{date.toDateString()}  {date.toLocaleTimeString('en-US')}</h6>
              </div>
            );
          })
          : <div className="jumbotron">
              <p className="lead">No New Notifications</p>
            </div>)
          : <div style={{textAlign: 'center', padding: 30}}><i className="fa fa-3x fa-spinner fa-spin"/></div>
        }
      </div>
    )
  }
}
