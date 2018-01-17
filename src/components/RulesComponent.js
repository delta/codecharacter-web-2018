import React                                      from 'react';

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
          markdown: text
        })
      });
  }

  render() {
    return <p>{this.state.markdown}</p>;
  }
}
