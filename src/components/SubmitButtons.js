import React from 'react';

export default class SubmitButtons extends React.Component {
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
          onClick={this.props.submitCode}
        >
          Submit Code
        </button>
      </div>
    );
  }
}
