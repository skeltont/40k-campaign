const express = require('express')
const router = express.Router()

router.get('/:room', function (req, res, next) {
  let room = null

  try {
    room = parseInt(req.params.room)
  } catch (error) {
    res.status(404).json({ 'error': 'invalid room id' })
  }

  req.mongo.db('campaign40k').collection('gameStates').find({ room: room }).toArray(function (err, results) {
    if (err) return console.log(err)
    res.status(200).json(results[0])
  })
})

module.exports = router
