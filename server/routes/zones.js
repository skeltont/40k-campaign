const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  req.mongo.db('campaign40k').collection('zones').find().toArray(function (err, results) {
    if (err) return console.log(err)
    res.status(200).json({
      zones: results
    })
  })
})

module.exports = router
