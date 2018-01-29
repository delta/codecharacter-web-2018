import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Redirect }                               from 'react-router';

export default class ProfileComponent extends React.Component {
  static propTypes = {
    profileData: PropTypes.object,
    getProfileData: PropTypes.func,
    userAuthenticateCheck: PropTypes.func
  };

  static defaultProps = {
    profileData: {
      username: '000000000',
      name: 'Null',
      sex: 'Male',
      nationality: 'Indian',
      address: '127.0.0.1',
      city: 'Chennai',
      contact: '1234567890',
      college: 'NITT'
    },
    getProfileData: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
        name: 'Venkatraman Srikanth'
    };
  }

  componentDidMount() {
    this.props.userAuthenticateCheck();
    this.props.getProfileData(this.props.userId);
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
                      <input type="email" className="form-control" id="email" value={this.state.name}/>
                    </div>
                    <div className="form-group" style={{paddingLeft: 20}}>
                      <button type="submit" className="btn btn-success" style={{borderRadius: 0}} onClick={() => this.setState({edit: false})}>Submit</button>
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
                        <td>1000</td>
                      </tr>
                      <tr>
                        <td>Nationality</td>
                        <td>Indian</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>info@support.com</td>
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
      </div>
    );
  }
}
