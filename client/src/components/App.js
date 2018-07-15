import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import '../style/App.css'
import Room from './Room'
import Login from './Login'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)

    const { cookies } = props
    this.state = {
      room: cookies.get('campaign40k-room'),
      admin: cookies.get('campaign40k-admin')
    }

    this.host = 'http://localhost:3006'
  }

  loggedIn () {
    return true
  }

  render () {
    return (
      <Switch>
        <Route exact path='/' render={(props) => (
          <Room host={this.host} />
        )} />
        <Route path='/login' render={(props) => (
          <Login host={this.host} />
        )} />
      </Switch>
    )
  }
}

export default withCookies(App)
