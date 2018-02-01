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
    addNotifications: PropTypes.func,
  };

  componentDidMount() {
    this.changePingStatus();
  }

  componentWillUnmount() {
    clearInterval(this.codeStatus);
  }

  changePingStatus = () => {
    this.codeStatus = setInterval(() => {
        if (this.props.loginStatus) {
          this.props.getCodeStatus();
          this.props.getMatchStatus(this.props.matchId);
          this.props.getLatestMatchId();
          this.props.getUnreadNotifications();
        }
      }
      , 1000);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.codeStatus !== nextProps.codeStatus) {
      this.startMatch(this.props.codeStatus, nextProps.codeStatus);
      this.getCompilationStatus(this.props.codeStatus, nextProps.codeStatus);
      this.handleCodeNotifications(this.props.codeStatus, nextProps.codeStatus);
    }

    if (this.props.matchStatus !== nextProps.matchStatus) {
      this.handleMatchNotifications(this.props.matchStatus, nextProps.matchStatus);
    }
  };

  handleCodeNotifications = (codeStatusOld, codeStatusNew) => {
    if (codeStatusNew === 'COMPILING') {
      this.props.addNotifications([{
        type: 'INFORMATION',
        title: 'Compiling...',
        message: 'Your code is being compiled. Hang on tight.',
        createdAt: Date.now().toString()
      }]);
    }
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'SUCCESS') {
      this.props.addNotifications([{
        type: 'SUCCESS',
        title: 'Successful Compilation!',
        message: 'Your code compiled successfully.',
        createdAt: Date.now().toString()
      }]);
    }
  };

  handleMatchNotifications = (matchStatusOld, matchStatusNew) => {
    if (matchStatusNew === 'EXECUTING') {
        this.props.addNotifications([{
          type: 'INFORMATION',
          title: 'Executing...',
          message: 'Your code is running.',
          createdAt: Date.now().toString()
        }]);
      }
      else if (matchStatusOld === 'EXECUTING' && matchStatusNew === 'SUCCESS') {
        this.props.addNotifications([{
          type: 'SUCCESS',
          title: 'Match executed successfully',
          message: 'Your match has successfully executed.',
          createdAt: Date.now().toString()
      }]);
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
