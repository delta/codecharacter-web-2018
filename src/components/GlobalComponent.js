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
    fetchCode: PropTypes.func,
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
        this.props.getUnreadNotifications();
      }
      , 1000);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.codeStatus !== nextProps.codeStatus) {
      this.startMatch(this.props.codeStatus, nextProps.codeStatus);
      this.getCompilationStatus(this.props.codeStatus, nextProps.codeStatus);
    }
  };

  getCompilationStatus = (codeStatusOld, codeStatusNew) => {
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'ERROR') {
      this.props.getCompilationStatus();
    }
  };

  startMatch = (codeStatusOld, codeStatusNew) => {
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'SUCCESS') {
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
