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

    if (!zone) return null

    return (
      <div class="content">
        <h3> {zone.name} </h3>
        <p>
          
        </p>
      </div>
    )
  }

  render () {
    let styles = this.handlePlacement()
    let content = this.formatContent()

    return (
      <div id='zone-info' style={styles}>
        <div class="backdrop" />
        <div class="border" />
        {content}
      </div>
    )
  }
}

export default ZoneInfo
