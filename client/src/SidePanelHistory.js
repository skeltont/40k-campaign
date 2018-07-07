import React, { Component } from 'react'
import CampaignHistoryRow from './CampaignHistory'

class SidePanelHistory extends Component {
  constructor (props) {
    super(props)

    this.factions = props.factions
    this.state = {
      items: [
        {
          factions: {
            attacker: 2,
            defender: 1
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        },
        {
          factions: {
            attacker: 2,
            defender: 1
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        },
        {
          factions: {
            attacker: 1,
            defender: 2
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        },
        {
          factions: {
            attacker: 2,
            defender: 1
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        },
        {
          factions: {
            attacker: 2,
            defender: 1
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        },
        {
          factions: {
            attacker: 2,
            defender: 1
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        },
        {
          factions: {
            attacker: 2,
            defender: 1
          },
          sector: 'Baal',
          info: {
            date: 1530851958,
            spoils: '36 dingles',
            winner: 1
          }
        }
      ]
    }
  }

  render () {
    return (
      <div id='history-panel'>
        {this.state.items.map((item, index) => (
          <CampaignHistoryRow key={index} data={item} factions={this.factions} />
        ))}
      </div>
    )
  }
}

export default SidePanelHistory
