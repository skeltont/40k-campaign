import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div id="container">
        <div id="map-panel">
          <Map />
        </div>
        <div id="history-panel">
          Campaign History
          <ul>
            <li>
              <p>Territory 1 taken by Player 1</p>
              <p>Territory 3 taken by Player 2</p>
              <p>Territory 2 taken by Player 3</p>
              <p>Territory 1 taken by Player 1</p>
              <p>Territory 3 taken by Player 2</p>
              <p>Territory 2 taken by Player 3</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
