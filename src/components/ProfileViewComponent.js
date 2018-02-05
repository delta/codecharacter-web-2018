import React from 'react';
import { getCountryName } from '../utils/countryCodes';
// import Flag from "react-flags";
import NotFoundComponent from './NotFoundComponent';
import FlagIconFactory from 'react-flag-icon-css/lib/index';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

export default class ProfileViewComponent extends React.Component {

  componentWillMount() {
    this.props.getProfileViewData(this.props.match.params.name);
  }

  render() {
    const FlagIcon = FlagIconFactory(React, { useCssModules: false });
    console.log(this.props.profileViewData.nationality);
    return (
      <div>
        { !this.props.isFetching ?
          !(this.props.profileViewData.name === '')
            ? <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                  <div className="panel panel-info">
                    <div className="panel-heading" style={{padding: 20, paddingLeft: 0}}>
                      <h3 className="panel-title">{this.props.profileViewData.name}
                        {(this.props.userId !== this.props.profileViewData.id && this.props.loginStatus)
                          ? <button className="btn btn-info" style={{borderRadius: 0, height: 49, boxShadow: 'none', cursor: 'pointer', margin: 10, marginLeft: 25, color: 'black'}} onClick={() => {this.props.challengePlayer(this.props.profileViewData.id)}}>
                            Challenge
                            <span><img src={'assets/sword.png'} width="25" height="25" alt="challenge" style={{marginLeft: 10}}/></span>
                          </button>
                          : null}
                      </h3>
                    </div>
                    <div className="panel-body">
                      <div className="row">
                        <div className=" col-md-12 col-lg-12 ">
                          <table className="table table-user-information">
                            <tbody>
                            <tr>
                              <td>Rating</td>
                              <td>{this.props.profileViewData.rating}</td>
                            </tr>
                            <tr>
                              <td>Nationality</td>
                              <td>
                                <span style={{marginRight: 10}}>
                                  <FlagIcon
                                    code={this.props.profileViewData.nationality ? this.props.profileViewData.nationality.toLowerCase() : 'in'}
                                    size={'lg'}
                                  />
                                </span>
                                {getCountryName(this.props.profileViewData.nationality)}
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : <NotFoundComponent/>
          : <div style={{textAlign: 'center', padding: 30}}><i className="fa fa-3x fa-spinner fa-spin"/></div>}
      </div>
    );
  }
}
