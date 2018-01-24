import React from 'react';
import Joyride from 'react-joyride';

export default class DemoComponent extends React.Component {
  render() {
    return (
      <div className="app">
        <Joyride
          ref="joyride"
          steps={[
            {
              title: 'Code Panel',
              text: 'This is where you can code',
              selector: '.code-panel',
              position: 'right',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Editor Panel',
              text: 'Edit your code preferences',
              selector: 'div .editor-panel',
              position: 'right',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Run And Compile',
              text: 'Click Run Code to Compile and Test. \nClick Lock Code to Let others play against you',
              selector: '.run-compile-button div',
              position: 'top-left',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Renderer',
              text: 'Your Compiled Code Runs Here',
              selector: '.renderer',
              position: 'top-left',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Debug Console',
              text: 'Your Errors and Logs will be displayed here',
              selector: '.debug-panel #codeCharacterEditor',
              position: 'top-left',
              type: 'hover',
              isFixed: true
            }
          ]}
          showSkipButton={true}
          stepIndex={1}
          keyboardNavigation={true}
          run={this.props.initialLogin} // or some other boolean for when you want to start it
          debug={false}
          type={'continuous'}
        />
        {this.props.children}
      </div>
    );
  }
}
