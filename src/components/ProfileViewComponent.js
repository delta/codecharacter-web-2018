import React from 'react';
import { getCountryName } from '../utils/countryCodes';

export default class ProfileViewComponent extends React.Component {

  componentWillMount() {
    console.log(this.props.match.params.name);
    this.props.getProfileViewData(this.props.match.params.name);
  }

  render() {
    console.log(this.props.profileViewData);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
            <div className="panel panel-info">
              <div className="panel-heading" style={{padding: 20, paddingLeft: 0}}>
                <h3 className="panel-title">{this.props.profileViewData.name}</h3>
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
                        <td>{getCountryName(this.props.profileViewData.nationality)}</td>
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
    );
  }

}
