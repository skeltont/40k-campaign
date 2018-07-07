import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import SidePanelHistory from './SidePanelHistory'

class App extends Component {
  constructor () {
    super()

    this.factions = {
      1: {
        banner: 'blood-angels.jpeg',
        name: 'Blood Angels'
      },
      2: {
        banner: 'orks.jpg',
        name: 'Ork Boiz'
      }
    }
  }
  render () {
    return (
      <div id='container'>
        <div id='map-panel'>
          <Map />
        </div>
        <SidePanelHistory factions={this.factions} />
      </div>
    )
  }
}

export default App
