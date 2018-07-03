const express = require('express')
const router = express.Router()
const env = require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

router.get('/', function (req, res, next) {
  var db = null
  MongoClient.connect(env.parsed.mongo_url, (err, client) => {
    if (err) return console.log(err)

    db = client.db('campaign40k')
    db.collection('zones').find().toArray(function (err, results) {
      if (err) return console.log(err)
      res.status(200).json({
        zones: results
      })
    })
  })
})

module.exports = router
