  import React from 'react';
  import PropTypes from 'prop-types';

  export default class EditorCustomizeComponent extends React.Component {
    static propTypes = {
        codePreferences: PropTypes.object,
        changeTheme: PropTypes.func,
        changeFontSize: PropTypes.func,
        changeEnableBasicAutoCompletion: PropTypes.func,
        changeEnableLiveAutoCompletion: PropTypes.func,
        changeHighlightActiveLine: PropTypes.func,
        changeKeyboardHandler: PropTypes.func
    };

    static defaultProps = {
      codePreferences: {
        theme: 'monokai',
        fontSize: 14,
        keyboardHandler: 'default',
        enableBasicAutoCompletion: true,
        enableLiveAutoCompletion: true,
        highlightActiveLine: true
      },
      changeTheme: () => {},
      changeFontSize: () => {},
      changeEnableBasicAutoCompletion: () => {},
      changeEnableLiveAutoCompletion: () => {},
      changeHighlightActiveLine: () => {},
      changeKeyboardHandler: () => {}
    };

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
            <div className='nav-link form-group'>
              <p style={{
                color: '#D2D3D5',
                fontFamily: 'Rubik, sans serif'
              }}>Theme</p>
              <select
                className='form-control'
                onChange={(event)=>this.props.changeTheme(event.target.value)}
                defaultValue={this.props.codePreferences.theme}
                style={{ cursor: 'pointer'}}
              >
                <option>monokai</option>
                <option>github</option>
                <option>tomorrow</option>
                <option>crimson_editor</option>
                <option>kuroir</option>
                <option>twilight</option>
                <option>xcode</option>
                <option>textmate</option>
                <option>solarized_dark</option>
                <option>solarized_light</option>
                <option>terminal</option>
              </select>
            </div>
            <div className='nav-link form-group'>
              <p style={{
                color: '#D2D3D5',
                fontFamily: 'Rubik, sans serif'
              }}>Font Size</p>
              <select
                className='form-control'
                onChange={(event)=>{this.props.changeFontSize(event.target.value);}}
                defaultValue={this.props.codePreferences.fontSize}
                style={{ cursor: 'pointer'}}
                >
                <option>8</option>
                <option>10</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>20</option>
                <option>24</option>
                <option>28</option>
                <option>32</option>
                <option>40</option>
              </select>
            </div>
            <div className='nav-link form-group'>
              <p style={{
                color: '#D2D3D5',
                fontFamily: 'Rubik, sans serif'
              }}>Keyboard Handler</p>
              <select
                className='form-control'
                onChange={(event)=>this.props.changeKeyboardHandler(event.target.value)}
                defaultValue={this.props.codePreferences.keyboardHandler}
                style={{ cursor: 'pointer'}}
              >
                <option>default</option>
                <option>vim</option>
                <option>emacs</option>
              </select>
            </div>
            <div className='nav-link form-group'>
              <fieldset className='form-group'>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input custom-checkbox'
                      type='checkbox'
                      defaultChecked={this.props.codePreferences.enableBasicAutoCompletion ? "checked" : ""}
                      onChange={(event)=>this.props.changeEnableBasicAutoCompletion(event.target.checked)}
                    />
                    <p style={{color: '#D2D3D5', fontFamily: 'Rubik, sans serif'}}>Enable Basic Autocomplete</p>
                  </label>
                </div>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      defaultChecked={this.props.codePreferences.enableLiveAutoCompletion ? "checked" : ""}
                      onChange={(event)=>this.props.changeEnableLiveAutoCompletion(event.target.checked)}
                    />
                    <p style={{color: '#D2D3D5', fontFamily: 'Rubik, sans serif'}}>Enable Live Autocomplete</p>
                  </label>
                </div>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      defaultChecked={this.props.codePreferences.highlightActiveLine ? "checked" : ""}
                      onChange={(event)=>this.props.changeHighlightActiveLine(event.target.checked)}
                    />
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
