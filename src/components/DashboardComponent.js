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
    compilationStatus: PropTypes.string,
    code: PropTypes.string,
    matchesView: PropTypes.bool,
    matchesViewTable: PropTypes.element,
    shouldFetchLog: PropTypes.bool,
    lastMatchId: PropTypes.number,
    ais: PropTypes.array,
    gameLog: PropTypes.array,
    runCode: PropTypes.func,
    lockCode: PropTypes.func,
    fetchCode: PropTypes.func,
    logout: PropTypes.func,
    getAIs: PropTypes.func,
    fetchGameLog: PropTypes.func,
    changeAIid: PropTypes.func,
    initialLogin: PropTypes.bool,
    clearCompilationStatus: PropTypes.func
  };

  static defaultProps = {
    loginStatus: false,
    compilationStatus: '>> Compilation Status Goes Here',
    code: '#include <iostream> \nusing namespace std; \n\nint main() \n// Enter code here (C or C++)',
    matchesView: false,
    matchesViewTable: null,
    shouldFetchLog: false,
    lastMatchId: -1,
    ais: [],
    gameLog: [],
    runCode: () => {},
    lockCode: () => {},
    fetchCode: () => {},
    logout: () => {},
    getAIs: () => {},
    fetchGameLog: () => {},
    changeAIid: () => {},
    clearCompilationStatus: () => {},
    initialLogin: false
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
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      highlightActiveLine: false
    };
  }

  componentDidMount() {
    this.props.userAuthenticateCheck();
    this.props.clearCompilationStatus();
    this.props.fetchCode();
    this.props.getAIs();
    this.props.fetchGameLog(this.props.lastMatchId);
    this.windowResizeListener = window.addEventListener('resize',() => {
      this.setState({
        height: window.innerHeight,
        width: window.innerWidth
      })
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeListener);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.code !== this.props.code) {
      this.setState({
        code: nextProps.code
      });
    }

    if(nextProps.shouldFetchLog && !this.props.shouldFetchLog) {
      console.log(nextProps.lastMatchId);
      this.props.fetchGameLog(nextProps.lastMatchId);
    }

    if(nextProps.gameLog !== this.props.gameLog) {
        let logFile = new Uint8Array(nextProps.gameLog);
        this.setState({logFile: logFile});
    }

  }

  runCode = () => {
    this.props.runCode(this.state.code);
  };

  lockCode = () => {
    this.props.lockCode(this.state.code);
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
    console.log(fontSize);
    this.setState({
      fontSize: Number(fontSize)
    });
  };

  changeEnableBasicAutoCompletion = (basicAutocompletion) => {
    this.setState({
      enableBasicAutoCompletion: basicAutocompletion
    })
  };

  changeEnableLiveAutoCompletion = (liveAutocompletion) => {
    console.log(liveAutocompletion);
    this.setState({
      enableLiveAutoCompletion: liveAutocompletion
    })
  };

  changeHighlightActiveLine = (highlightActiveLine) => {
    this.setState({
      highlightActiveLine: highlightActiveLine
    })
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
                    />
                  </div>
                  <div className="code-panel">
                    <CodeComponent
                      code={this.state.code}
                      theme={this.state.theme}
                      fontSize={this.state.fontSize}
                      enableBasicAutocompletion={this.state.enableBasicAutoCompletion}
                      enableLiveAutocompletion={this.state.enableLiveAutoCompletion}
                      highlightActiveLine={this.state.highlightActiveLine}
                      onChange={(code) => this.updateCode(code)}
                    />
                  </div>
                </div>
                : this.props.matchesViewTable
              }
            </div>
            <div className={'splitPaneRight'}>
              <SplitPane
                split="horizontal"
                minSize={100}
                defaultSize={400}
              >
                <div style={{width: "100%"}} className={'renderer'}>
                  <div
                    style={{ display: 'block', width: '100%'}}
                    className="renderer-panel"
                  >
                    {this.state.logFile
                      ?(<CodeCharacterRenderer
                        logFile={this.state.logFile}
                        logFunction={console.log}
                      />)
                      : <div className="jumbotron">
                        <p className="lead">Click on a match to view the gameplay</p>
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
                  />
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
                ?(<CodeCharacterRenderer logFile={this.state.logFile}/>)
                : <div className="jumbotron">
                  <h1 className="display-3">Hello, world!</h1>
                  <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                  <hr className="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                      <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
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
            />
            : null
          }
        </div>
      );
    }
  }
}
