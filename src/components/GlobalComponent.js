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
        this.props.getMatchStatus(this.props.matchId);
        this.props.getLatestMatchId();
        this.props.fetchGameLog(this.props.matchId);
        this.props.getUnreadNotifications();
      }
      , 500);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.codeStatus !== nextProps.codeStatus) {
      this.startMatch(this.props.codeStatus, nextProps.codeStatus);
    }
  };

  startMatch = (codeStatusOld, codeStatusNew) => {
    if (codeStatusOld === 'compiling' && codeStatusNew === 'success') {
      this.props.getLatestMatchId();
      this.props.competeAgainstAI(this.props.aiId);
    }
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
