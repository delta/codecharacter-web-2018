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
    return <div style={{width: '100%', height: window.innerHeight - 53, position: 'absolute', overflowY: 'hidden'}}>
      <iframe src="https://code.pragyan.org/docs/" height="100%" width="100%" title={'docs'} frameborder="0"/>
    </div> ;
  }
}
