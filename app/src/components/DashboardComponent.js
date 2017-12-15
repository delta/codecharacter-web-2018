import React                          from 'react';
import NavbarComponent                from './NavbarComponent';
import CodeComponent                  from './CodeComponent.js';

export default class DashboardComponent extends React.Component {
  render() {
    return (
      <div className='navbarWrapper'>
        <NavbarComponent/>
        <div className='container'>
          <div className='row'>
            <div className='col codeComponentWrapper'>
              <CodeComponent />
              <div style={{float: 'right'}}>
                <button className="btn btn-danger codeButtons" type="submit">Run Code</button>
                <button className="btn btn-danger codeButtons" type="submit">Submit Code</button>
              </div>
            </div>
            <div className='col'>
              <div>
                <div style={{backgroundColor: 'black', width: '100%',height: 400}}><p>Simulator coming soon</p></div>
              </div>
              <DebugComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

