import { connect }                             from 'react-redux';
import {
  userLogout,
  executeCode
}                                              from '../redux/actions';
import NavbarComponent                         from '../components/NavbarComponent';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    codeStatus: state.codeStatus,
    matchStatus: state.matchStatus,
    lastUsed: state.lastUsed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {dispatch(userLogout())},
    executeCode: () => {}
  }
};

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);

export default NavbarContainer;
