import React from 'react';
import PropTypes from 'prop-types';

export default class EditorCustomizeComponent extends React.Component {
  render() {
    return (
      <div style={{position: 'absolute', height: '100%', top: 0}}>
        <div style={{width: 200, height: '100%', backgroundColor: 'red'}}></div>
      </div>
    );
  }
}
