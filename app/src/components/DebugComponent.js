import React                          from 'react';
import AceEditor                      from 'react-ace';
import brace                          from 'brace';
import 'brace/theme/solarized_dark';

export default class DebugComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splits: 2,
      orientation: 'beside',
      theme: '',
      mode: 'javascript',
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
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
        readOnly={true}
      />
    );
  }
}
