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
    username: PropTypes.string,
    compilationStatus: PropTypes.string,
    code: PropTypes.string,
    matchesView: PropTypes.bool,
    matchesViewTable: PropTypes.element,
    shouldFetchLog: PropTypes.bool,
    lastMatchId: PropTypes.number,
    runCode: PropTypes.func,
    lockCode: PropTypes.func,
    fetchCode: PropTypes.func,
    logout: PropTypes.func,
    getAIs: PropTypes.func,
    ais: PropTypes.array
  };

  static defaultProps = {
    username: '000000000',
    compilationStatus: '>> Compilation Status Goes Here',
    code: '#include <iostream> \nusing namespace std; \n\nint main() \n// Enter code here (C or C++)',
    readOnly: false,
    matchesView: false,
    shouldFetchLog: false,
    matchesViewTable: null,
    runCode: () => {},
    lockCode: () => {},
    fetchCode: () => {},
    logout: () => {},
    logFile: '',
    getAIs: () => {},
    ais: []
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
    this.props.getAIs();
    /*this.request = fetch('game.log')
      .then((response) => {
        response.arrayBuffer()
          .then((buffer) => {
            return new Uint8Array(buffer);
          });
      });
    (this.request).then((response) => {
      this.setState({
        logFile: response
      })
    });*/
    this.props.fetchCode();
    if(this.props.shouldFetchLog) {
      this.props.fetchGameLog(this.props.lastMatchId);
    }
    this.windowResizeListener = window.addEventListener('resize',() => {this.setState({height: window.innerHeight, width: window.innerWidth})});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeListener);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loginStatus) {
      this.props.history.push('/login');
    }

    if(nextProps.code !== this.props.code) {
      this.setState({
        code: nextProps.code
      });
    }

    if(nextProps.shouldFetchLog && !this.props.shouldFetchLog) {
      this.props.fetchGameLog(nextProps.lastMatchId);
    }

    if(nextProps.gameLog !== this.props.gameLog) {
        let logFile = new Uint8Array(nextProps.gameLog);
        this.setState({logFile: logFile});
    }
  }

  runCode = () => { this.props.runCode(this.state.code); };

  lockCode = () => { this.props.lockCode(this.state.code); };

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
    console.log(this.props.ais, "AIS IN DASHBOARD DDAAAAAWWWW");
    if (this.state.width >= 600) {
      return (
        <DemoComponent>
          <SplitPane split="vertical" minSize={50} maxSize='10%' defaultSize='40%'
                     style={{ height: this.state.height - 50 }}>
            <div>
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
            <div>
              <SplitPane split="horizontal" minSize={100} defaultSize={400}>
                <div style={{width: "100%"}}>
                  <div style={{ display: 'block', width: '100%'}} className="renderer-panel">
                    {this.state.logFile
                      ?(<CodeCharacterRenderer logFile={this.state.logFile}/>)
                      : <div>LOADING .. </div>
                    }
                  </div>
                </div>
                <div className="debug-panel">
                  <CodeComponent
                    showLineNumbers={false}
                    code={this.props.compilationStatus}
                    theme={'terminal'}
                    highlightActiveLine={false}
                  />
                </div>
              </SplitPane>
            </div>
          </SplitPane>
          <div className="run-compile-button">
            {!this.props.matchesView ?
              <SubmitButtons runCode={() => this.runCode()} aiList={this.props.ais} lockCode={() => this.lockCode()}/> : null}
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
                /></div>
              : this.props.matchesViewTable
            }
          </div>
          <div style={{display: 'block'}}>
            <div style={{ display: 'block', width: '100%', height: 300}}>
              {this.state.logFile
                ?(<CodeCharacterRenderer logFile={this.state.logFile}/>)
                : <div>LOADING .. </div>
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
          {!this.props.matchesView ?
            <SubmitButtons runCode={() => this.runCode()} lockCode={() => this.lockCode()} aiList={this.props.ais}/> : null}
        </div>
      );
    }
  }
}
