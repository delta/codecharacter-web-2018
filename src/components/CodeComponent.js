import React                          from 'react';
import AceEditor                      from 'react-ace';
import brace                          from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

export default class CodeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splits: 2,
      orientation: 'beside',
      theme: 'solarized_dark',
      mode: 'javascript',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
      code: '// Enter your Code here'
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
        mode={this.state.mode}
        theme={this.state.theme}
        name="codeCharacterEditor"
        onChange={this.onChange}
        value={this.state.code}
        fontSize={this.state.fontSize}
        showPrintMargin={this.state.showPrintMargin}
        showGutter={this.state.showGutter}
        highlightActiveLine={this.state.highlightActiveLine}
        setOptions={{
          enableBasicAutocompletion: this.state.enableBasicAutocompletion,
          enableLiveAutocompletion: this.state.enableLiveAutocompletion,
          enableSnippets: this.state.enableSnippets,
          showLineNumbers: this.state.showLineNumbers,
          tabSize: 2,
        }}
        style={{
          position: 'relative',
          width: '100%',
        }}
      />
    );
  }
}
