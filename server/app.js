const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const env = require('dotenv').config()

const zones = require('./routes/zones')
const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(function () {
  var connection
  return function expressMongoDb (req, res, next) {
    if (!connection) {
      connection = MongoClient.connect(env.parsed.mongo_url)
    }

    connection
      .then(function (client) {
        req['mongo'] = client
        next()
      })
      .catch(function (err) {
        connection = undefined
        next(err)
      })
  }
}())

app.use('/zones', zones)

app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
