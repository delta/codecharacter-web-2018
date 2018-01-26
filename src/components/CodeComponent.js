import React                                      from 'react';
import AceEditor                                  from 'react-ace';
import PropTypes                                  from 'prop-types';
import 'brace/mode/c_cpp';
import 'brace/mode/plain_text';
import 'brace/theme/xcode';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/theme/crimson_editor';
import 'brace/ext/language_tools';
require('brace/keybinding/vim');
require('brace/keybinding/emacs');

export default class CodeComponent extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    showLineNumbers: PropTypes.bool,
    mode: PropTypes.string,
    code: PropTypes.string,
    fontSize: PropTypes.number,
    readOnly: PropTypes.bool,
    highlightActiveLine: PropTypes.bool,
    enableBasicAutocompletion: PropTypes.bool,
    enableLiveAutocompletion: PropTypes.bool,
    onChange: PropTypes.func,
    height: PropTypes.number,
    keyboardHandler: PropTypes.string
  };

  static defaultProps = {
    theme: 'monokai',
    showLineNumbers: true,
    code: '// Enter Code Here',
    mode: 'c_cpp',
    fontSize: 14,
    readOnly: false,
    highlightActiveLine: false,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    onChange: () => {},
    height: window.innerHeight - 50,
    keyboardHandler: 'default'
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.height !== nextProps.height) {
      this.refs.codeCharacterEditor.editor.resize();
    }
  };

  render() {
    return (
      <AceEditor
        ref='codeCharacterEditor'
        mode={this.props.mode}
        theme={this.props.theme}
        name='codeCharacterEditor'
        onChange={(data) => this.props.onChange(data)}
        value={this.props.code}
        fontSize={this.props.fontSize}
        showPrintMargin={true}
        showGutter={true}
        wrapEnabled={true}
        keyboardHandler={(this.props.keyboardHandler === 'default') ? '' : this.props.keyboardHandler}
        readOnly={this.props.readOnly}
        highlightActiveLine={this.props.highlightActiveLine}
        editorProps={{
          $blockScrolling: Infinity
        }}
        setOptions={{
          enableBasicAutocompletion: this.props.enableBasicAutocompletion,
          enableLiveAutocompletion: this.props.enableLiveAutocompletion,
          enableSnippets: false,
          showLineNumbers: this.props.showLineNumbers,
          tabSize: 4,
        }}
        style={{
          width: '100%',
          height: this.props.height
        }}
      />
    );
  }
}
