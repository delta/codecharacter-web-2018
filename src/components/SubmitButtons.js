import React                                      from 'react';
import PropTypes                                  from 'prop-types';

export default class SubmitButtons extends React.Component {
  static propTypes = {
    runCode: PropTypes.func,
    lockCode: PropTypes.func
  };

  static defaultProps = {
    runCode: () => {},
    lockCode: () => {}
  };

  render() {
    return (
      <div style={{position: 'absolute', zIndex: 4, bottom: 0, left: 0}}>
        <button
          className="btn btn-success"
          style={{borderRadius: 0, margin: 10}}
          onClick={this.props.runCode}
        >
          Run Code
        </button>
        <button
          className="btn btn-danger"
          style={{borderRadius: 0, margin: 10}}
          onClick={this.props.lockCode}
        >
          Submit Code
        </button>
      </div>
    );
  }
}
