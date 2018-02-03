import React                      from 'react';
import NavbarContainer            from '../containers/NavbarContainer';
import NotificationContainer      from '../containers/NotificationContainer';
import PropTypes                  from 'prop-types';

export default class GlobalComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    pingStatus: PropTypes.bool,
    code: PropTypes.string,
    codeBeingSubmitted: PropTypes.bool,
    getCodeStatus: PropTypes.func,
    getLatestMatchId: PropTypes.func,
    getMatchStatus: PropTypes.func,
    fetchCode: PropTypes.func,
    codeSave: PropTypes.func,
    addNotifications: PropTypes.func,
    changePingStatusActive: PropTypes.func,
    lockCode: PropTypes.func,
    changeCodeBeingSubmitted: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      interval: 10000
    };
    this.minPing = 2000;
    this.maxPing = 10000;
  }

  componentDidMount() {
    this.props.changePingStatusActive(false);
    this.props.changeLastUsed(0);
    this.codeStatusInterval = setInterval(this.changePingStatus, this.state.interval);
    this.changePingStatus();
  }

  componentWillUnmount() {
    clearInterval(this.codeStatusInterval);
  }

  changePingStatus = () => {
    if (this.props.loginStatus) {
      this.props.getGameStatus();
      // this.props.codeSave(this.props.code);
      this.props.getUnreadNotifications();
    }
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

    if(this.props.pingStatus !== nextProps.pingStatus) {
      if (nextProps.pingStatus) {
        this.setState({
          interval: this.minPing
        });
      }
      else {
        this.setState({
          interval: this.maxPing
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    clearInterval(this.codeStatusInterval);
    this.changePingStatus();
    this.codeStatusInterval = setInterval(this.changePingStatus, this.state.interval);
  }
  handleCodeNotifications = (codeStatusOld, codeStatusNew) => {
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'SUCCESS') {
      this.props.addNotifications([{
        type: 'SUCCESS',
        title: 'Successful Compilation!',
        message: 'Your code compiled successfully.',
        createdAt: Date.now().toString()
      }]);
    }
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'ERROR') {
      this.props.changePingStatusActive(false);
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
          title: 'Match Executed',
          message: 'Your match has successfully executed.',
          createdAt: Date.now().toString()
        }]);
      this.props.changePingStatusActive(false);
    }
  };

  getCompilationStatus = (codeStatusOld, codeStatusNew) => {
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'ERROR') {
      this.props.changeCodeBeingSubmitted(false);
      this.props.getCompilationStatus();
    }
  };

  startMatch = (codeStatusOld, codeStatusNew) => {
    if (codeStatusOld === 'COMPILING' && codeStatusNew === 'SUCCESS' && !this.props.codeBeingSubmitted) {
      this.props.competeAgainstAI(this.props.aiId);
    }
    else if(codeStatusOld === 'COMPILING' && codeStatusNew === 'SUCCESS' && this.props.codeBeingSubmitted) {
      this.props.changeCodeBeingSubmitted(false);
      this.props.changePingStatusActive(false);
      this.props.lockCode();
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
