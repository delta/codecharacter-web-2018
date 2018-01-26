import React                                      from 'react';
import marked                                     from 'marked';

export default class RulesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ''
    };
  }

  componentWillMount() {
    const rules = require('../rules.md');
    fetch(rules)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          markdown: marked(text)
        })
      });
  }

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.state.markdown}} style={{margin: 50}}/> ;
  }
}
