import React, { Component } from 'react'
import '../style/App.css'
import Room from './Room'
import Login from './Login'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/room' component={Room} />
      </Switch>
    )
  }
}

export default App
