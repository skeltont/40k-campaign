import React, { Component } from 'react'
import ZoneInfo from './ZoneInfo'

// big shout out to:  https://gist.github.com/zackthehuman/1867663
// because I didn't do any hexagon math.

class Map extends Component {
  constructor (props) {
    super(props)
    this.sideLength = 60
    this.hexagonAngle = 0.523598776
    this.hexHeight = Math.sin(this.hexagonAngle) * this.sideLength
    this.hexRadius = Math.cos(this.hexagonAngle) * this.sideLength
    this.hexRectangleHeight = this.sideLength + 2 * this.hexHeight
    this.hexRectangleWidth = 2 * this.hexRadius
    this.boardWidth = 10
    this.boardHeight = 10

    this.state = {
      mouseX: null,
      mouseY: null,
      hexX: null,
      hexY: null,
      zone: null
    }
    this.gameState = null

    this.handleClick = this.handleClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  async componentDidMount () {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    let gameStateReq = await window.fetch(`${this.props.host}/gameStates/0`)
    let zoneReq = await window.fetch(`${this.props.host}/zones/0`)
    let factionReq = await window.fetch(`${this.props.host}/factions/0`)

    let gameState = await gameStateReq.json()
    let zones = await zoneReq.json()
    let factions = await factionReq.json()

    this.gameState = gameState
    this.zones = zones
    this.factions = factions

    this.drawMap(ctx)
  }

  checkMapBounds (x, y) {
    if (x < 0 || x + 1 > this.boardWidth) return false
    if (y < 0 || y + 1 > this.boardHeight) return false
    return true
  }

  drawMap (ctx) {
    for (let i = 0; i < this.boardWidth; ++i) {
      for (let j = 0; j < this.boardHeight; ++j) {
        const owner = (this.gameState) ? this.gameState.zones[(j * 10) + i].owner : null
        const color = (owner != null) ? this.factions[owner].color : null

        this.drawHexagon(
          ctx,
          i * this.hexRectangleWidth + ((j % 2) * this.hexRadius),
          j * (this.sideLength + this.hexHeight),
          color
        )
      }
    }
  }

  drawHexagon (ctx, x, y, color = null, fill = false) {
    x += 50
    y += 50

    ctx.beginPath()
    ctx.moveTo(x + this.hexRadius, y + 3)
    ctx.lineTo(x + this.hexRectangleWidth - 3, y + this.hexHeight)
    ctx.lineTo(x + this.hexRectangleWidth - 3, y + this.hexHeight + this.sideLength)
    ctx.lineTo(x + this.hexRadius, y + this.hexRectangleHeight - 3)
    ctx.lineTo(x + 3, y + this.sideLength + this.hexHeight)
    ctx.lineTo(x + 3, y + this.hexHeight)
    ctx.closePath()

    ctx.lineWidth = 3
    ctx.strokeStyle = '#fff'
    ctx.fillStyle = (color != null && !fill) ? color : '#fff'
    ctx.globalAlpha = 0.5

    ctx.fill()
    ctx.stroke()
  }

  handleClick (e) {
    console.log('Map.handleClick')
  }

  handleMouseMove (e) {
    const x = e.nativeEvent.offsetX - 50
    const y = e.nativeEvent.offsetY - 50
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    const hexY = Math.floor(y / (this.hexHeight + this.sideLength))
    const hexX = Math.floor((x - (hexY % 2) * this.hexRadius) / this.hexRectangleWidth)

    if (hexX === this.state.hexX && hexY === this.state.hexY) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.drawMap(ctx, this.boardWidth, this.boardHeight)

    if (!this.checkMapBounds(hexX, hexY)) {
      this.setState({
        mouseX: null,
        mouseY: null,
        hexX: null,
        hexY: null,
        zone: null,
        faction: null
      })

      return
    }

    const zoneId = (this.zones) ? (hexY * 10) + hexX : null
    const ownerId = (this.gameState) ? this.gameState.zones[zoneId].owner : null
    const faction = (this.factions) ? this.factions[ownerId] : null
    const color = (faction) ? faction.color : null
    const zone = (this.zones) ? this.zones.zones[zoneId] : null

    const screenX = hexX * this.hexRectangleWidth + ((hexY % 2) * this.hexRadius)
    const screenY = hexY * (this.hexHeight + this.sideLength)

    this.setState({
      mouseX: screenX,
      mouseY: screenY,
      hexX: hexX,
      hexY: hexY,
      zone: zone,
      faction: faction
    })

    this.drawHexagon(ctx, screenX, screenY, color, true)
  }

  render () {
    return (
      <div id='map' onClick={this.handleClick} onMouseMove={this.handleMouseMove}>
        <canvas ref='canvas' width='1200px' height='1000px' />
        <ZoneInfo ref='zoneInfo' faction={this.state.faction} zone={this.state.zone} x={this.state.mouseX} y={this.state.mouseY} />

      </div>
    )
  }
}

export default Map
