import React, { Component } from 'react'

class CampaignHistory extends Component {
  render () {
    return (
      <div>
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
    )
  }
}

export default CampaignHistory
