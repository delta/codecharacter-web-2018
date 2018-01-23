import React                      from 'react';
import NavbarContainer            from '../containers/NavbarContainer';
import NotificationContainer      from '../containers/NotificationContainer';
import PropTypes                  from 'prop-types';

export default class GlobalComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    getCodeStatus: PropTypes.func,
    getLatestMatchId: PropTypes.func,
    getMatchStatus: PropTypes.func,
    getUnreadNotifications: PropTypes.func,
  };

  componentDidMount() {
    this.changePingStatus();
  }

  componentWillUnmount() {
    clearInterval(this.codeStatus);
  }

  changePingStatus = () => {
    this.codeStatus = setInterval(() => {
        this.props.getCodeStatus();
        this.props.getLatestMatchId();
        this.props.getMatchStatus(this.props.matchId);
        this.props.getUnreadNotifications();
      }
      , 500);
  };

  render() {
    return (
      <div>
        <NavbarContainer/>
        <div style={{height: 50}}/>
        <NotificationContainer/>
      </div>
    )
  }
}
