const express = require('express')
const app = express()
const sourceFile = require('./pets.json')

app.get('/pets', function(req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(sourceFile))
})

app.get('/pets/0', function(req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(sourceFile[0]))
})

app.get('/pets/1', function(req, res, next) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(sourceFile[1]))
})

app.get('/pets/2', function(req, res, next) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not Found')
})

app.get('/pets/-1', function(req, res, next) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not Found')
})

app.listen(8000, function() {
  console.log('Listening on port 8000')
})


module.exports = app;
