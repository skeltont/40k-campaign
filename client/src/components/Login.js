import React, { Component } from 'react'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    const roomName = event.target.roomName.value
    const roomCode = event.target.roomCode.value

    event.preventDefault()

    let authReq = await window.fetch('http://localhost:3006/rooms', {
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

    console.log(auth)
    // @TODO: bind to cookie
  }

  render () {
    return (
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
  }
}

export default Login
