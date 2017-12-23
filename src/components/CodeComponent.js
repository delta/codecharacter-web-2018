import React                          from 'react';
import AceEditor                      from 'react-ace';
import PropTypes                      from 'prop-types';
import 'brace/mode/c_cpp';
import 'brace/theme/xcode';
import 'brace/theme/monokai';
import 'brace/theme/terminal';

export default class CodeComponent extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    showLineNumbers: PropTypes.bool,
    code: PropTypes.string,
    mode: PropTypes.string,
    readOnly: PropTypes.bool,
    highlightActiveLine: PropTypes.bool
  };

  static defaultProps = {
    theme: 'monokai',
    showLineNumbers: true,
    code: '// Enter Code Here',
    mode: 'c_cpp',
    readOnly: false,
    highlightActiveLine: true
  };

  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    };
  }

  onChange = (data) => {
    this.setState({
      code: data
    });
  };

  render() {
    return (
      <AceEditor
        mode={this.props.mode}
        theme={this.props.theme}
        name="codeCharacterEditor"
        onChange={this.onChange}
        value={this.state.code}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={this.props.highlightActiveLine}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: this.props.showLineNumbers,
          tabSize: 2,
        }}
        style={{
          width: '100%',
          height: window.innerHeight - 50
        }}
      />
    );
  }
}
