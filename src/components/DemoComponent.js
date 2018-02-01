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
              text: 'You write your code here! We\'ve given you some stub code that serves as a sample for what you can do, so do read through it.',
              selector: '.code-panel',
              position: 'right',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Editor Panel',
              text: 'You can customize your code editor! Change your color scheme, font size, etc. here.',
              selector: 'div .editor-panel',
              position: 'right',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Run And Compile',
              text: 'Click Run Code to test your code against yourself, or an AI. \nClick Submit Code to put your code on the leaderboard and challenge others!',
              selector: '.run-compile-button div',
              position: 'top-left',
              type: 'hover',
              isFixed: true
            },
            {
              title: 'Renderer',
              text: 'You can view your game after it runs here. Use the Arrow keys to Pan and the + and - keys to Zoom.',
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
