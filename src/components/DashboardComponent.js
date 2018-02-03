import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import SplitPane                                  from 'react-split-pane';
import { Redirect }                               from 'react-router-dom'
import CodeComponent                              from './CodeComponent';
import SubmitButtons                              from './SubmitButtons';
import EditorCustomizeComponent from './EditorCustomizeComponent';
import CodeCharacterRenderer                      from 'codecharacter-renderer';
import DemoComponent                              from './DemoComponent';
import FlagIconFactory                            from 'react-flag-icon-css';

export default class DashboardComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
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
    pingStatus: PropTypes.bool,
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
    changeCodeBeingSubmitted: PropTypes.func
  };

  static defaultProps = {
    loginStatus: false,
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
    runCode: () => {},
    lockCode: () => {},
    fetchCode: () => {},
    logout: () => {},
    updateCode: () => {},
    getAIs: () => {},
    fetchGameLog: () => {},
    changeAIid: () => {},
    clearCompilationStatus: () => {},
    initialLogin: false,
    changePingStatusActive: () => {},
    changeCodeBeingSubmitted: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
      height: window.innerHeight,
      width: window.innerWidth,
      logFile: '',
      theme: 'monokai',
      fontSize: 14,
      rendererHeight: 400,
      codeSpaceWidth: 0.4 * window.innerWidth,
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      highlightActiveLine: false,
      keyboardHandler: 'default',
      compilationData: '',
      staticBool: false
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

  }

  componentDidMount() {
    this.props.userAuthenticateCheck();
    this.props.clearCompilationStatus();
    this.props.fetchCode();
    this.props.getAIs();
    this.props.getGameStatus(true);
    this.windowResizeListener = window.addEventListener('resize',() => {
      this.setState({
        height: window.innerHeight,
        width: window.innerWidth
      })
    });
    this.updateCompildationDataInterval = setInterval(() => this.updateCompilationData(), 1000);
    this.updateCodeToStorageInterval = setInterval(this.updateCodeToApi, 15000);
  }

  runCode = () => {
    this.props.clearCompilationStatus();
    this.props.changePingStatusActive(true);
    this.props.runCode(this.state.code);
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
    this.setState({
      theme: theme
    });
  };

  changeFontSize = (fontSize) => {
    this.setState({
      fontSize: Number(fontSize)
    });
  };

  changeKeyboardHandler = (keyboardHandler) => {
      this.setState({
        keyboardHandler: keyboardHandler
      });
  };

  changeEnableBasicAutoCompletion = (basicAutocompletion) => {
    this.setState({
      enableBasicAutoCompletion: basicAutocompletion
    })
  };

  changeEnableLiveAutoCompletion = (liveAutocompletion) => {
    this.setState({
      enableLiveAutoCompletion: liveAutocompletion
    })
  };

  changeHighlightActiveLine = (highlightActiveLine) => {
    this.setState({
      highlightActiveLine: highlightActiveLine
    })
  };

  updateCodeToApi = () => {
      this.props.updateCode(this.state.code);
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
        <DemoComponent initialLogin={this.props.initialLogin}>
          <SplitPane
            split="vertical"
            minSize={50}
            maxSize='10%'
            defaultSize='40%'
            style={{ height: this.state.height - 50 }}
            onChange={size => this.setState({codeSpaceWidth: size})}
          >
            <div className={'codeSplitLeft'}>
              {!this.props.matchesView
                ? <div>
                  <div>
                    <EditorCustomizeComponent
                      changeTheme={this.changeTheme}
                      changeFontSize={this.changeFontSize}
                      changeEnableBasicAutoCompletion={this.changeEnableBasicAutoCompletion}
                      changeEnableLiveAutoCompletion={this.changeEnableLiveAutoCompletion}
                      changeHighlightActiveLine={this.changeHighlightActiveLine}
                      changeKeyboardHandler={this.changeKeyboardHandler}
                    />
                  </div>
                  <div className="code-panel" >
                    <CodeComponent
                      code={this.state.code}
                      theme={this.state.theme}
                      fontSize={this.state.fontSize}
                      enableBasicAutocompletion={this.state.enableBasicAutoCompletion}
                      enableLiveAutocompletion={this.state.enableLiveAutoCompletion}
                      highlightActiveLine={this.state.highlightActiveLine}
                      onChange={(code) => this.updateCode(code)}
                      keyboardHandler={this.state.keyboardHandler}
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
                minSize={100}
                defaultSize={400}
                onChange={size => this.setState({rendererHeight: size})}
              >
                <div style={{width: "100%"}} className={'renderer'}>
                  <div
                    style={{ display: 'block', width: '100%', height: this.state.rendererHeight}}
                    className="renderer-panel"
                  >
                    {this.state.logFile && !this.props.pingStatus && this.props.codeStatus !== 'ERROR'
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
                      : <div className="jumbotron" style={{height: '100%'}}>
                          <p className="lead">{this.props.defaultText}</p>
                        </div>
                    }
                  </div>
                </div>
                <div className="debug-panel">
                  <CodeComponent
                    showLineNumbers={true}
                    readOnly={true}
                    code={this.props.compilationStatus}
                    theme={'terminal'}
                    mode={'plain_text'}
                    highlightActiveLine={false}
                    height={window.innerHeight - this.state.rendererHeight - 50}
                  />
                  {/*<div style={{position: 'absolute'}}>{this.state.compilationData}</div>*/}
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
                disabled={(this.props.codeStatus === "COMPILING")||(this.props.matchStatus === 'EXECUTING')}
              />
              : null
            }
          </div>
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
