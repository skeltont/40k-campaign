const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  req.mongo.db('campaign40k').collection('gameStates').find().toArray(function (err, results) {
    if (err) return console.log(err)
    res.status(200).json(results[0])
  })
})

// router.get('/:id', function (req, res, next) {
//   console.log(req.params.id)
//
//   res.status(200).json({
//     zone: req.params.id
//   })
// })

module.exports = router
