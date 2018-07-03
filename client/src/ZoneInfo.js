import React, { Component } from 'react'

class ZoneInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: null,
      name: null
    }
  }

  componentWillReceiveProps () {
    if (!this.props.zone) return

    this.setState({
      id: this.props.zone.id,
      name: this.props.zone.name,
      styles: {
        left: this.props.x,
        top: this.props.y
      }
    })
  }

  render () {
    return (
      <div id='zone-info' style={this.state.styles}>
        id: {this.state.id}
        name: {this.state.name}
      </div>
    )
  }
}

export default ZoneInfo
