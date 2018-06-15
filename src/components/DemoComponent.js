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
              isFixed: true,
              style: {
                arrow: {
                  backgroundImage: 'url(data:image/svg+xml,%3Csvg%20width%3D%2218px%22%20height%3D%2236px%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%220%2C%200%208%2C%208%2016%2C0%22%20fill%3D%22%23fff%22%20transform%3D%22scale%282.25%29%20rotate%2890%204%204%29%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E)'
                }
              }
            },
            {
              title: 'Editor Panel',
              text: 'You can customize your code editor! Move your mouse pointer all the way to the left to bring up a menu in which you can change your color scheme, font size, etc.',
              selector: 'div.editor-panel',
              position: 'right',
              type: 'hover',
              isFixed: true,
              style: {
                arrow: {
                  backgroundImage: 'url(data:image/svg+xml,%3Csvg%20width%3D%2218px%22%20height%3D%2236px%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%220%2C%200%208%2C%208%2016%2C0%22%20fill%3D%22%23fff%22%20transform%3D%22scale%282.25%29%20rotate%2890%204%204%29%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E)'
                }
              }
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
              text: 'You can view your game after it runs here. Use the Arrow keys to Pan, + and - to Zoom and F to toggle fullscreen.',
              selector: '.renderer',
              position: 'left',
              type: 'hover',
              isFixed: true,
              style: {
                width: '19rem',
                arrow: {
                  backgroundImage: 'url(data:image/svg+xml,%3Csvg%20width%3D%2218px%22%20height%3D%2236px%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%220%2C%200%208%2C%208%2016%2C0%22%20fill%3D%22%23fff%22%20transform%3D%22scale%282.25%29%20rotate%28270%208%208%29%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E)'
                }
              }
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
          showStepsProgress={true}
          toolTipOffset={10}
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
