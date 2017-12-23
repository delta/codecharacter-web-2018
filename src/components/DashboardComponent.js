import React                          from 'react';
import PropTypes                      from 'prop-types';
import NavbarComponent                from './NavbarComponent';
import CodeComponent                  from './CodeComponent.js';
import SplitPane                      from 'react-split-pane';
import SubmitButtons                  from './SubmitButtons';

export default class DashboardComponent extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    compilationStatus: PropTypes.string,
    code: PropTypes.string,
    runCode: PropTypes.func,
    submitCode: PropTypes.func
  };

  static defaultProps = {
    username: '000000000',
    compilationStatus: '>> Compilation Status Goes Here',
    code: '#include <iostream> \nusing namespace std; \n\nint main() \n// Enter code here (C or C++)',
    readOnly: false,
    runCode: () => {},
    submitCode: () => {}
  };

  render() {
    return (
      <div>
        <NavbarComponent/>
        <SplitPane split="vertical" minSize={100} maxSize={600} defaultSize={600} style={{height: window.innerHeight - 50 }}>
          <div>
            <CodeComponent
              code={this.props.code}
            />
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
        <SubmitButtons runCode={this.props.runCode} submitCode={this.props.submitCode}/>
      </div>
    );
  }
}

