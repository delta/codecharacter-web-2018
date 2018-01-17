import React from 'react';

const bgImage = "http://www.returnofkings.com/wp-content/uploads/2016/02/maxresdefault-3.jpg";

export default class WelcomeScreenComponent extends React.Component {
  render() {
    return (
      <div style={{height: 1800}}>
        <div style={{backgroundColor: 'black'}}>
          <div style={{paddingTop: '15%', paddingBottom: '15%'}}>
            <h1 style={{textAlign: 'center', color: 'white', fontSize: 80, fontFamily: 'Supermercado One'}}>CODE - CHARACTER</h1>
            <h2 style={{textAlign: 'center', color: 'white'}}>The Ultimate AI Mind F*** Challenge</h2>
          </div>
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
    );
  }
}
