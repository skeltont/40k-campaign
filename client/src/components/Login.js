import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { Route, Redirect } from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const { cookies } = this.props
    const room = cookies.get('campaign40k-room')

    // @TODO: will need to change when cookie restructure happens
    if (typeof room !== 'undefined') {
      this.setState({
        loggedIn: true
      })
    }
  }

  async handleSubmit (event) {
    const roomName = event.target.roomName.value
    const roomCode = event.target.roomCode.value

    event.preventDefault()

    let authReq = await window.fetch(`${this.props.host}/rooms`, {
      method: 'POST',
      body: JSON.stringify({
        roomName: roomName,
        roomCode: roomCode
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    let auth = await authReq.json()

    if (!auth.error) {
      const { cookies } = this.props

      cookies.set('campaign40k-room', auth.roomID, { path: '/' })
      cookies.set('campaign40k-admin', auth.admin, { path: '/' })

      this.setState({
        loggedIn: true
      })
    }
  }

  render () {
    return (
      <Route path='/' render={() => (
        this.state.loggedIn ? (
          <Redirect to='/' />
        ) : (
          <div id='login'>
            <form onSubmit={this.handleSubmit}>
              <div className='content'>
                <div>
                  <label>Room Name</label>
                  <input name='roomName' type='text' />
                </div>
                <div>
                  <label>Room Code </label>
                  <input name='roomCode' type='password' />
                </div>
                <div>
                  <input type='submit' />
                </div>
              </div>
            </form>
          </div>
        )
      )} />
    )
  }
}

export default withCookies(Login)
