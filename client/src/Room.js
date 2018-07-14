import React, { Component } from 'react'
import './App.css'
import Map from './Map'
import CampaignHistory from './CampaignHistory'

class Room extends Component {
  render () {
    return (
      <div id='container'>
        <div id='map-panel'>
          <Map />
        </div>
        <div id='history-panel'>
          <CampaignHistory />
        </div>
      </div>
    )
  }
}

export default Room
