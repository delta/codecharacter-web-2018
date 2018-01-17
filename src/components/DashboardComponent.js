import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import SplitPane                                  from 'react-split-pane';
import { Redirect }                               from 'react-router-dom'
import CodeComponent                              from './CodeComponent';
import SubmitButtons                              from './SubmitButtons';
import CodeCharacterRenderer                      from 'codecharacter-renderer';

export default class DashboardComponent extends React.Component {
  static propTypes = {
    loginStatus: PropTypes.bool,
    username: PropTypes.string,
    compilationStatus: PropTypes.string,
    code: PropTypes.string,
    matchesView: PropTypes.bool,
    matchesViewTable: PropTypes.element,
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
      });
    });
  };

  componentWillMount() {
    this.props.fetchCode();
  }

  componentDidMount() {
    this.windowResizeListener = window.addEventListener('resize',() => {this.setState({height: window.innerHeight, width: window.innerWidth})});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeListener);
  }

  runCode = () => { this.props.runCode(this.state.code); };

  lockCode = () => { this.props.lockCode(this.state.code); };

  updateCode = (code) => {
    this.setState({
      code: code
    });
  };

  render() {
    if (!this.props.loginStatus) {
      return <Redirect to='/login'/>
    }

    if (this.state.width >= 600) {
      return (
        <div>
          <SplitPane split="vertical" minSize={50} maxSize='10%' defaultSize='40%'
                     style={{ height: this.state.height - 50 }}>
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
