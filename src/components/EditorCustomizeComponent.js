import React from 'react';
import PropTypes from 'prop-types';

export default class EditorCustomizeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: -190
    };
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          height: '100%',
          top: 0,
          zIndex: 10,
          left: this.state.left,
          transition: '0.5s left'
        }}
        className='editor-panel'
        onMouseOver={() => {
          this.setState({ left: 0 })
        }}
        onMouseLeave={() => {
          this.setState({ left: -190 })
        }}
      >
        <div style={{
          width: 200,
          height: '100%',
          backgroundColor: '#3C444C',
          borderRight: '10px solid #343A40'
        }}>
          <div className="nav-link form-group">
            <p style={{
              color: '#D2D3D5',
              fontFamily: 'Rubik, sans serif'
            }}>Theme</p>
            <select className="form-control" onChange={(event)=>this.props.changeTheme(event.target.value)}>
              <option>monokai</option>
              <option>github</option>
              <option>tomorrow</option>
              <option>kuroir</option>
              <option>twilight</option>
              <option>xcode</option>
              <option>textmate</option>
              <option>solarized_dark</option>
              <option>solarized_light</option>
              <option>terminal</option>
            </select>
          </div>
          <div className="nav-link form-group">
            <p style={{
              color: '#D2D3D5',
              fontFamily: 'Rubik, sans serif'
            }}>Font Size</p>
            <select className="form-control" onChange={(event)=>this.props.changeFontSize(event.target.value)}>
              <option>8</option>
              <option>10</option>
              <option>12</option>
              <option selected="selected">14</option>
              <option>16</option>
              <option>18</option>
              <option>20</option>
              <option>24</option>
              <option>28</option>
              <option>32</option>
              <option>40</option>
            </select>
          </div>
          <div className="nav-link form-group">
            <fieldset className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input custom-checkbox" type="checkbox" value="" onChange={(event)=>this.props.changeEnableBasicAutoCompletion(event.target.checked)}/>
                  <p style={{color: '#D2D3D5', fontFamily: 'Rubik, sans serif'}}>Enable Basic Autocomplete</p>
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" value="" onChange={(event)=>this.props.changeEnableLiveAutoCompletion(event.target.checked)}/>
                  <p style={{color: '#D2D3D5', fontFamily: 'Rubik, sans serif'}}>Enable Live Autocomplete</p>
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" value="" onChange={(event)=>this.props.changeHighlightActiveLine(event.target.checked)}/>
                  <p style={{color: '#D2D3D5', fontFamily: 'Rubik, sans serif'}}>Highlight Active Line</p>
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
