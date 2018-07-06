import React, { Component } from 'react'

class ZoneInfo extends Component {
  handlePlacement () {
    let x = this.props.x
    let y = this.props.y

    if (x == null || y == null) return { display: "none" }

    y += (y - 144 < 0) ? 170 : -144

    return {
      left: x,
      top: y
    }
  }

  formatContent () {
    const zone = this.props.zone
    const faction = this.props.faction

    if (!zone) return null

    return (
      <div className="content">
        <h3> {zone.name} </h3>
        <div className="faction">
          {faction.name}
        </div>
        <div className="zone-info">
          <div className="label">
            Battle Benefit:
          </div>
          <div className="value">
            {zone.battleBenefit}
          </div>
        </div>
        <div className="zone-info">
          <div className="label">
            Battle Detriment:
          </div>
          <div className="value">
            {zone.battleDetriment}
          </div>
        </div>
        <div className="zone-info">
          <div className="label">
            Faction Boon:
          </div>
          <div className="value">
            +{zone.factionBoon.amount} {zone.factionBoon.type}
          </div>
        </div>
      </div>
    )
  }

  render () {
    let styles = this.handlePlacement()
    let content = this.formatContent()

    return (
      <div id='zone-info' style={styles}>
        <div className="backdrop" />
        <div className="border" />
        {content}
      </div>
    )
  }
}

export default ZoneInfo
