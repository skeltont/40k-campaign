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
    this.zoneData = null

    this.handleClick = this.handleClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  async componentDidMount () {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')

    let zoneDataReq = await window.fetch('http://localhost:3006/zones')
    let zoneData = await zoneDataReq.json()
    this.zoneData = zoneData.zones

    this.drawMap(ctx)
  }

  drawMap (ctx) {
    for (let i = 0; i < this.boardWidth; ++i) {
      for (let j = 0; j < this.boardHeight; ++j) {
        this.drawHexagon(
          ctx,
          i * this.hexRectangleWidth + ((j % 2) * this.hexRadius),
          j * (this.sideLength + this.hexHeight)
        )
      }
    }
  }

  drawHexagon (ctx, x, y, fill = false) {
    x += 50
    y += 50

    ctx.beginPath()
    ctx.moveTo(x + this.hexRadius, y)
    ctx.lineTo(x + this.hexRectangleWidth, y + this.hexHeight)
    ctx.lineTo(x + this.hexRectangleWidth, y + this.hexHeight + this.sideLength)
    ctx.lineTo(x + this.hexRadius, y + this.hexRectangleHeight)
    ctx.lineTo(x, y + this.sideLength + this.hexHeight)
    ctx.lineTo(x, y + this.hexHeight)
    ctx.closePath()

    ctx.strokeStyle = '#fff'
    ctx.fillStyle = '#fff'

    if (fill) {
      ctx.fill()
    } else {
      ctx.stroke()
    }
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

    if (hexX < 0 || hexX + 1 > this.boardWidth) return

    if (hexY < 0 || hexY + 1 > this.boardHeight) return

    const screenX = hexX * this.hexRectangleWidth + ((hexY % 2) * this.hexRadius)
    const screenY = hexY * (this.hexHeight + this.sideLength)

    this.setState({
      mouseX: screenX,
      mouseY: screenY,
      hexX: hexX,
      hexY: hexY,
      zone: this.zoneData[(hexY * 10) + hexX]
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.drawMap(ctx, this.boardWidth, this.boardHeight)

    this.drawHexagon(ctx, screenX, screenY, true)
  }

  render () {
    return (
      <div id='map' onClick={this.handleClick} onMouseMove={this.handleMouseMove}>
        <ZoneInfo ref='zoneInfo' zone={this.state.zone} x={this.state.mouseX} y={this.state.mouseY} />
        <canvas ref='canvas' width='1200px' height='1000px' />
      </div>
    )
  }
}

export default Map
