import { connect }                             from 'react-redux';
import { userLogout }                          from '../redux/actions';
import NavbarComponent                         from '../components/NavbarComponent';

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    status: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {dispatch(userLogout())}
  }
};

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);

export default NavbarContainer;
