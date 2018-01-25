import React                                      from 'react';
import {
  Table
}                                                 from 'react-bootstrap';
import PropTypes                                  from 'prop-types';

export default class ProfileComponent extends React.Component {
  static propTypes = {
    profileData: PropTypes.object,
    getProfileData: PropTypes.func,
  };

  static defaultProps = {
    profileData: {
      username: '000000000',
      name: 'Gotha Deadpool',
      sex: 'Male',
      nationality: 'Indian',
      address: 'Hare Rama Hare Krishna',
      city: 'Chennai',
      contact: '6969696969',
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

  render() {
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
                  <a  onClick={() => this.setState({edit: !this.state.edit})} data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"/></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
