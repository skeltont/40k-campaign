const express = require('express')
const router = express.Router()

router.post('/', function (req, res, next) {
  const roomName = req.body.roomName
  const roomCode = req.body.roomCode
  let status = 404
  let body = null

  req.mongo.db('campaign40k').collection('rooms').find({name: roomName}).toArray(function (err, results) {
    if (err) return console.log(err)

    if (typeof results[0] !== 'undefined') {
      const room = results[0]

      room.codes.forEach(obj => {
        if (roomCode === obj.val) {
          status = 200
          body = {
            roomName: room.name,
            roomID: room.id,
            admin: obj.admin
          }
        }
      })

      if (!body) body = { error: 'incorrect key provided' }
    }

    if (!body) body = { error: 'could not find room' }
    res.status(status).json(body)
  })
})

module.exports = router
