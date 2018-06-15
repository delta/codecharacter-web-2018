import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import SplitPane                                  from 'react-split-pane';
import { Redirect }                               from 'react-router-dom'
import CodeComponent                              from './CodeComponent';
import SubmitButtons                              from './SubmitButtons';
import EditorCustomizeComponent from './EditorCustomizeComponent';
import CodeCharacterRenderer                      from 'codecharacter-renderer';
import DemoComponent                              from './DemoComponent';

export default class DashboardComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    firstMount: PropTypes.bool,
    compilationStatus: PropTypes.string,
    code: PropTypes.string,
    matchesView: PropTypes.bool,
    matchesViewTable: PropTypes.element,
    shouldFetchLog: PropTypes.bool,
    lastMatchId: PropTypes.number,
    defaultText: PropTypes.string,
    codeStatus: PropTypes.string,
    matchStatus: PropTypes.string,
    ais: PropTypes.array,
    dLogs: PropTypes.arrayOf(PropTypes.string),
    gameLog: PropTypes.array,
    pointOfView: PropTypes.number,
    pingStatus: PropTypes.bool,
    isGameFetching: PropTypes.bool,
    runCode: PropTypes.func,
    lockCode: PropTypes.func,
    fetchCode: PropTypes.func,
    logout: PropTypes.func,
    getAIs: PropTypes.func,
    fetchGameLog: PropTypes.func,
    changeAIid: PropTypes.func,
    updateCode: PropTypes.func,
    initialLogin: PropTypes.bool,
    clearCompilationStatus: PropTypes.func,
    changePingStatusActive: PropTypes.func,
    changeCodeBeingSubmitted: PropTypes.func,
    changeFirstMount: PropTypes.func,
    changeCodePreferences: PropTypes.func
  };

  static defaultProps = {
    loginStatus: false,
    firstMount: true,
    compilationStatus: '>> Compilation Status Goes Here',
    code: '#include <iostream> \nusing namespace std; \n\nint main() \n// Enter code here (C or C++)',
    matchesView: false,
    matchesViewTable: null,
    shouldFetchLog: false,
    pingStatus: false,
    defaultText: 'RUN CODE and see it run here. Don\'t forget to SUBMIT when you\'ve finalised your code.',
    lastMatchId: -1,
    codeStatus: '',
    matchStatus: '',
    ais: [],
    dLogs: ['', ''],
    gameLog: [],
    isGameFetching: false,
    initialLogin: false,
    pointOfView: 1,
    runCode: () => {},
    lockCode: () => {},
    fetchCode: () => {},
    logout: () => {},
    updateCode: () => {},
    getAIs: () => {},
    fetchGameLog: () => {},
    changeAIid: () => {},
    clearCompilationStatus: () => {},
    changePingStatusActive: () => {},
    changeCodeBeingSubmitted: () => {},
    changeFirstMount: () => {},
    changeCodePreferences: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
      height: window.innerHeight,
      width: window.innerWidth,
      logFile: '',
      rendererHeight: props.matchesView ? window.innerHeight - 50 : 400,
      codeSpaceWidth: 0.4 * window.innerWidth,
      compilationData: '',
      staticBool: false,
      badgeDisplay: false,
      disabled: true,
      codePreferences: this.props.codePreferences
    };
    this.compilationData = '';
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeListener);
    clearInterval(this.updateCompildationDataInterval);
    clearInterval(this.updateCodeToStorageInterval);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.code !== this.props.code) {
      this.setState({
        code: nextProps.code
      });
    }

    if (this.props.matchStatus === 'EXECUTING' && nextProps.matchStatus === 'SUCCESS') {
      this.props.getGameStatus(true);
      // this.props.fetchGameLog(nextProps.lastMatchId);
    }

    if(nextProps.gameLog !== this.props.gameLog) {
        let logFile = new Uint8Array(nextProps.gameLog);
        this.setState({logFile: logFile});
    }

    if (this.props.codePreferences !== nextProps.codePreferences) {
      this.setState({
        codePreferences: nextProps.codePreferences
      });
    }
  }

  componentDidMount() {
    this.props.userAuthenticateCheck();
    this.props.clearCompilationStatus();
    this.props.fetchCode();
    this.props.getAIs();
    this.props.getGameStatus(false);
    this.windowResizeListener = window.addEventListener('resize',() => {
      this.setState({
        height: window.innerHeight,
        width: window.innerWidth
      })
    });
    if (!this.props.matchesView) {
      this.updateCompildationDataInterval = setInterval(() => this.updateCompilationData(), 1000);
      this.updateCodeToStorageInterval = setInterval(this.updateCodeToApi, 15000);
    }
    if (this.props.initialLogin && this.props.firstMount) {
      this.props.changeFirstMount(false);
      this.setState({
        disabled: false
      });
    }
    else {
      this.setState({
        disabled: true
      });
    }
  }

  runCode = () => {
    this.props.clearCompilationStatus();
    this.props.changePingStatusActive(true);
    this.props.runCode(this.state.code);
    this.compilationData = '';
  };

  lockCode = () => {
    this.props.changeCodeBeingSubmitted(true);
    this.runCode();
    // this.props.lockCode(this.state.code);
  };

  updateCode = (code) => {
    this.setState({
      code: code
    });
  };

  changeTheme = (theme) => {
    this.props.changeCodePreferences({
      ...this.props.codePreferences,
      theme
    });
  };

  changeFontSize = (fontSize) => {
    this.props.changeCodePreferences({
      ...this.props.codePreferences,
      fontSize
    });
  };

  changeKeyboardHandler = (keyboardHandler) => {
    this.props.changeCodePreferences({
      ...this.props.codePreferences,
      keyboardHandler
    });
  };

  changeEnableBasicAutoCompletion = (enableBasicAutoCompletion) => {
    this.props.changeCodePreferences({
      ...this.props.codePreferences,
      enableBasicAutoCompletion
    });
  };

  changeEnableLiveAutoCompletion = (enableLiveAutoCompletion) => {
    this.props.changeCodePreferences({
      ...this.props.codePreferences,
      enableLiveAutoCompletion
    });
  };

  changeHighlightActiveLine = (highlightActiveLine) => {
    this.props.changeCodePreferences({
      ...this.props.codePreferences,
      highlightActiveLine
    });
  };

  updateCodeToApi = () => {
    if (this.state.code !== this.props.code) {
      this.props.updateCode(this.state.code);
      this.setState({
        badgeDisplay: true
      });
      setTimeout(() => {
        this.setState({
          badgeDisplay: false
        });
      }, 2500);
    }
  };

  updateCompilationData = () => {
    this.props.updateCompilationStatus(this.compilationData);
    this.compilationData = '';
  };

  render() {
    if(!this.props.loginStatus) {
      return <Redirect to={'/login'} />;
    }
    if (this.state.width >= 600) {
      return (
        <DemoComponent initialLogin={!this.state.disabled}>
          <SplitPane
            split="vertical"
            minSize={50}
            maxSize='10%'
            defaultSize='40%'
            style={{ height: this.state.height - 50 }}
            onChange={size => this.setState({codeSpaceWidth: size})}
          >
            <div className={'codeSplitLeft'} >
              {!this.props.matchesView
                ? <div>
                  <div>
                    <div
                      style={{position: 'absolute', zIndex: 2, right: 0, borderRadius: 0, marginRight: 20, marginTop: 5}}
                    >
                      <span className="badge badge-secondary pull-right" onClick={() => this.updateCodeToApi()} style={{cursor: 'pointer', position: 'relative'}}>
                        Save Code
                      </span>
                    </div>
                    <EditorCustomizeComponent
                      changeTheme={this.changeTheme}
                      changeFontSize={this.changeFontSize}
                      changeEnableBasicAutoCompletion={this.changeEnableBasicAutoCompletion}
                      changeEnableLiveAutoCompletion={this.changeEnableLiveAutoCompletion}
                      changeHighlightActiveLine={this.changeHighlightActiveLine}
                      changeKeyboardHandler={this.changeKeyboardHandler}
                      codePreferences={this.state.codePreferences}
                    />
                  </div>
                  <div className="code-panel">
                    <CodeComponent
                      code={this.state.code}
                      theme={this.state.codePreferences.theme}
                      fontSize={this.state.codePreferences.fontSize}
                      enableBasicAutocompletion={this.state.codePreferences.enableBasicAutoCompletion}
                      enableLiveAutocompletion={this.state.codePreferences.enableLiveAutoCompletion}
                      highlightActiveLine={this.state.codePreferences.highlightActiveLine}
                      onChange={(code) => this.updateCode(code)}
                      keyboardHandler={this.state.codePreferences.keyboardHandler}
                      width={this.state.codeSpaceWidth}
                      saveCode={this.updateCodeToApi}
                      height={this.state.height - 50}
                    />
                  </div>
                </div>
                : <div style={{height: window.innerHeight - 50}}>
                  {this.props.matchesViewTable}
                  </div>
              }
            </div>
            <div className={'splitPaneRight'}>
              <SplitPane
                split="horizontal"
                minSize={0}
                defaultSize={this.props.matchesView ? (window.innerHeight - 50) : 400}
                onChange={size => this.setState({rendererHeight: size})}
              >
                <div style={{width: "100%"}} className={'renderer'}>
                  {!(this.props.isGameFetching || this.props.pingStatus)
                   ? (this.state.logFile && this.state.logFile!== '' && !this.props.pingStatus && this.props.codeStatus !== 'ERROR'
                    ? <div
                          style={{ display: 'block', width: '100%', height: this.state.rendererHeight}}
                          className="renderer-panel"
                        >
                          <CodeCharacterRenderer
                          logFile={this.state.logFile}
                          options={{
                            logFunction: (data) => {this.compilationData += data;},
                            logClearFunction: () => {this.props.clearCompilationStatus();},
                            player1Log: this.props.dLogs[0],
                            player2Log: this.props.dLogs[1],
                            playerID: this.props.pointOfView
                          }}
                        />
                        </div>
                        : <div className="jumbotron" style={{height: '100%'}}>
                          <p className="lead">{this.props.defaultText}</p>
                        </div>
                    )
                    : <div className="h-100 row align-items-center">
                      <div className="mx-auto" style={{textAlign: 'center'}}>
                        <div className="la-ball-atom">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div className="debug-panel">
                  {!this.props.matchesView
                  ? <CodeComponent
                    showLineNumbers={true}
                    readOnly={true}
                    code={this.props.compilationStatus}
                    theme={'terminal'}
                    mode={'plain_text'}
                    highlightActiveLine={false}
                    height={window.innerHeight - this.state.rendererHeight - 50}
                  />
                  : null}
                </div>
              </SplitPane>
            </div>
          </SplitPane>
          <div className="run-compile-button">
            {!this.props.matchesView
              ? <SubmitButtons
                runCode={() => this.runCode()}
                aiList={this.props.ais}
                lockCode={() => this.lockCode()}
                changeAIid={(id) => this.props.changeAIid(id)}
                disabled={this.props.pingStatus}
              />
              : null
            }
          </div>
          {this.state.badgeDisplay
            ? <div style={{position: 'absolute', zIndex: 10, top: 46, left: 5}}><span className="badge badge-dark">Saving...</span></div>
            : null}
        </DemoComponent>
      );
    }

    else {
      return (
        <div>
          <div style={{display: 'block'}}>
            {!this.props.matchesView
              ? <div>
                <EditorCustomizeComponent/>
                <CodeComponent
                  code={this.state.code}
                  onChange={this.updateCode}
                />
              </div>
              : this.props.matchesViewTable
            }
          </div>
          <div style={{display: 'block'}}>
            <div style={{ display: 'block', width: '100%', height: 300}}>
              {this.state.logFile
                ?(<CodeCharacterRenderer
                  logFile={this.state.logFile}
                  options={{
                    logFunction: (data) => {this.compilationData += data;},
                    logClearFunction: () => {this.props.clearCompilationStatus();},
                    player1Log: this.props.dLogs[0],
                    player2Log: this.props.dLogs[1],
                    playerID: 1
                  }}
                />)
                : <div className="jumbotron">
                  <p className="lead">{this.props.defaultText}</p>
                </div>
              }
            </div>
            <div style={{display: 'block'}}>
              <CodeComponent
                showLineNumbers={false}
                code={this.props.compilationStatus}
                theme={'terminal'}
                highlightActiveLine={false}
              />
            </div>
          </div>
          {!this.props.matchesView
            ? <SubmitButtons
              runCode={() => this.runCode()}
              lockCode={() => this.lockCode()}
              aiList={this.props.ais}
              disabled={(this.props.codeStatus === "COMPILING")||(this.props.matchStatus === 'EXECUTING')}
            />
            : null
          }
        </div>
      );
    }
  }
}
