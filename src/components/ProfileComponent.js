import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import {
  Modal
}                                                 from 'react-bootstrap';
import { Redirect }                               from 'react-router';

export default class ProfileComponent extends React.Component {
  static propTypes = {
    profileData: PropTypes.object,
    getProfileData: PropTypes.func,
    userAuthenticateCheck: PropTypes.func
  };

  static defaultProps = {
    profileData: {name: '', rating: 0, email: ''},
    getProfileData: () => {},
  };

  constructor(props) {
    super(props);
    console.log(this.props.profileData);
    this.state = {
      edit: false,
      name: this.props.profileData.name
    };
  }

  updateName = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  componentWillMount() {
    this.props.userAuthenticateCheck();
    this.props.getProfileData(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileData !== nextProps.profileData) {
      this.setState({
        name: nextProps.profileData.name
      });
    }
  }

  render() {
    console.log(this.props.profileData);
    if(!this.props.loginStatus) {
      return <Redirect to={'/login'} />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
            <div className="panel panel-info">
              <div className="panel-heading" style={{padding: 20, paddingLeft: 0}}>
                {this.state.edit
                  ? <form className="form-inline">
                    <div className="form-group">
                      <input type="email" className="form-control" id="email" value={this.state.name} onChange={this.updateName}/>
                    </div>
                    <div className="form-group" style={{paddingLeft: 20}}>
                      <button type="submit" className="btn btn-success" style={{borderRadius: 0}} onClick={() => {this.setState({edit: false}); this.props.change}}>Submit</button>
                    </div>
                  </form>
                  : <h3 className="panel-title">{this.state.name}</h3>
                }
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className=" col-md-12 col-lg-12 ">
                    <table className="table table-user-information">
                      <tbody>
                      <tr>
                        <td>Rating</td>
                        <td>{this.props.profileData.rating}</td>
                      </tr>
                      <tr>
                        <td>Nationality</td>
                        <td>Indian</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.profileData.email}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <span className="pull-right">
                  <a  onClick={() => this.setState({edit: !this.state.edit})} data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"/></a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby='modal-label'
          show={true}
          onHide={this.close}
        >
          <div className={"modal-body"} >
            <h4 id='modal-label'>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            {/*<ModalExample/>*/}
          </div>
        </Modal>
      </div>
    );
  }
}
