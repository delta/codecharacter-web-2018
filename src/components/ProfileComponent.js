import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import {
  Modal
}                                                 from 'react-bootstrap';
import { Redirect }                               from 'react-router';
import FlagIconFactory from 'react-flag-icon-css/lib/index';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { getCountryName }                         from '../utils/countryCodes';

export default class ProfileComponent extends React.Component {
  static propTypes = {
    profileData: PropTypes.object,
    isFetching: PropTypes.bool,
    getProfileData: PropTypes.func,
    userAuthenticateCheck: PropTypes.func,
    changeProfile: PropTypes.func,
    changeIsFetching: PropTypes.func
  };

  static defaultProps = {
    profileData: {name: '', rating: 0, email: ''},
    isFetching: true,
    getProfileData: () => {},
    changeIsFetching: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: this.props.profileData.name,
      nationality: this.props.profileData.nationality
    };
  }

  updateName = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  onSelectFlag = (countryCode) => {
    this.setState({
      nationality: countryCode
    });
  };

  componentWillMount() {
    this.props.userAuthenticateCheck();
    this.props.getProfileData(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileData !== nextProps.profileData) {
      this.setState({
        name: nextProps.profileData.name,
        nationality: nextProps.profileData.nationality
      });
    }
  }

  render() {
    const FlagIcon = FlagIconFactory(React, { useCssModules: false });

    if(!this.props.loginStatus) {
      return <Redirect to={'/login'} />;
    }

    return (
      <div>
        {!this.props.isFetching ? <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                <div className="panel panel-info">
                  <div className="panel-heading" style={{padding: 20, paddingLeft: 0}}>
                    {this.state.edit
                      ? <div>
                        <div className="form-group">
                          <input type="email" className="form-control" id="email" value={this.state.name} onChange={this.updateName}/>
                        </div>
                      </div>
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
                            {this.state.edit
                              ? <td>
                                <ReactFlagsSelect defaultCountry={this.props.profileData.nationality} searchable={true} onSelect={this.onSelectFlag}/>
                              </td>
                              : <td>
                                <span style={{marginRight: 10}}>
                                  <FlagIcon
                                    code={this.state.nationality ? this.state.nationality.toLowerCase() : 'in'}
                                    size={'lg'}
                                  />
                                </span>
                                {this.state.nationality ? getCountryName(this.state.nationality) : 'India'}
                              </td>}
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
                    {this.state.edit ?<div className="form-group" style={{paddingLeft: 20}}>
                        <button type="submit" className="btn btn-success" style={{borderRadius: 0}}
                                onClick={() => {this.setState({edit: false});
                                                this.props.changeProfile(this.state.name, this.state.nationality, this.props.userId);
                                                this.props.changeIsFetching(true);
                                }}>Submit</button>
                      </div>
                      : null}
                    <span className="pull-right">
                      <a  onClick={() => this.setState({edit: !this.state.edit})} data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"/></a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <div style={{textAlign: 'center', padding: 30}}><i className="fa fa-3x fa-spinner fa-spin"/></div>}
      </div>
    );
  }
}
