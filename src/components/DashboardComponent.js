import React                          from 'react';
import PropTypes                      from 'prop-types';
import CodeComponent                  from './CodeComponent.js';
import SplitPane                      from 'react-split-pane';
import SubmitButtons                  from './SubmitButtons';
import { Redirect }                   from 'react-router';

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
      code: props.code
    };
  };

  componentWillMount() {
    this.props.fetchCode();
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

  render() {

    if (!this.props.loginStatus) {
      return <Redirect to="/login" />;
    }

    else {
      return (
        <div>
          <SplitPane split="vertical" minSize={100} maxSize={600} defaultSize={600} style={{height: window.innerHeight - 50 }}>
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
              <SplitPane split="horizontal" minSize={400} defaultSize={400}>
                <div>
                  <div style={{display: 'block'}}>Render Component Goes Here</div>
                </div>
                <div style={{backgroundColor: 'black'}}>
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
          {!this.props.matchesView ? <SubmitButtons runCode={() => this.runCode()} lockCode={() => this.lockCode()}/>: null}
        </div>
      );
    }
  }
}

