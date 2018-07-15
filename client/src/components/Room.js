import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import Map from './Map'
import CampaignHistory from './CampaignHistory'
import { Route, Redirect } from 'react-router-dom'

class Room extends Component {
  constructor (props) {
    super(props)

    this.host = this.props.host

    const { cookies } = props
    this.state = {
      room: cookies.get('campaign40k-room'),
      admin: cookies.get('campaign40k-admin')
    }
  }

  loggedIn () {
    if (typeof this.state.room === 'undefined') return false
    return true
  }

  render () {
    return (
      <Route path='/' render={() => (
        !this.loggedIn() ? (
          <Redirect to='/login' />
        ) : (
          <div id='container'>
            <div id='map-panel'>
              <Map host={this.props.host} />
            </div>
            <div id='history-panel'>
              <CampaignHistory />
            </div>
          </div>
        )
      )} />
    )
  }
}

export default withCookies(Room)
