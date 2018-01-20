import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import SplitPane                                  from 'react-split-pane';
import { Redirect }                               from 'react-router-dom'
import CodeComponent                              from './CodeComponent';
import SubmitButtons                              from './SubmitButtons';
import EditorCustomizeComponent from './EditorCustomizeComponent';
import CodeCharacterRenderer                      from 'codecharacter-renderer';

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
    logout: PropTypes.func
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
    logout: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
      height: window.innerHeight,
      width: window.innerWidth
    };

    fetch('game.log').then((response) => {
      response.arrayBuffer().then((buffer) => {
        let logFile = new Uint8Array(buffer);
        this.setState({logFile: logFile});
        console.log(this.state.logFile, this.props.gameLog);
      });
    });
  }

  componentDidMount() {
    this.props.fetchCode();
    console.log("Rendering");
    if(!this.props.loginStatus) {
      this.props.history.push('/login');
    }
    if(this.props.shouldFetchLog) {
      this.props.fetchGameLog();
    }
    console.log("Component is being Mounted");
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
      this.props.fetchGameLog();
    }
    if(nextProps.gameLog !== this.props.gameLog) {
      console.log("Log should replace now.");
    }
  }

  runCode = () => { this.props.runCode(this.state.code); };

  lockCode = () => { this.props.lockCode(this.state.code); };

  updateCode = (code) => {
    this.setState({
      code: code
    });
  };

  render() {
    if (this.state.width >= 600) {
      return (
        <div>
          <SplitPane split="vertical" minSize={50} maxSize='10%' defaultSize='40%'
                     style={{ height: this.state.height - 50 }}>
            <div>
              {!this.props.matchesView
                ? <div>
                  <EditorCustomizeComponent/>
                  <CodeComponent
                    code={this.state.code}
                    onChange={(code) => this.updateCode(code)}
                  />
                </div>
                : this.props.matchesViewTable
              }
            </div>
            <div>
              <SplitPane split="horizontal" minSize={100} defaultSize={400}>
                <div style={{width: "100%"}}>
                  <div style={{ display: 'block', width: '100%', height: '100%'}}>
                    {this.state.logFile
                      ?(<CodeCharacterRenderer logFile={this.state.logFile}/>)
                      : <div>LOADING .. </div>
                    }
                  </div>
                </div>
                <div>
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
          {!this.props.matchesView ?
            <SubmitButtons runCode={() => this.runCode()} lockCode={() => this.lockCode()}/> : null}
        </div>
      );
    }

    else {
      return (
        <div>
          <div>
            {!this.props.matchesView
              ? <CodeComponent
                code={this.state.code}
                onChange={this.updateCode}
              />
              : this.props.matchesViewTable
            }
          </div>
          <div>
            <div>
              <div style={{ display: 'block' }}>Render Component Goes Here</div>
            </div>
            <div>
              <CodeComponent
                showLineNumbers={false}
                code={this.props.compilationStatus}
                theme={'terminal'}
                highlightActiveLine={false}
              />
            </div>
          </div>
          {!this.props.matchesView ?
            <SubmitButtons runCode={() => this.runCode()} lockCode={() => this.lockCode()}/> : null}
        </div>
      );
    }
  }
}
