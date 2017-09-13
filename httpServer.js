const http = require('http')
const port = process.env.PORT || 8000
const sourceFile = require('./pets.json')

const server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(sourceFile))
  }
  else if (req.method === 'GET' && req.url === '/pets/0') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(sourceFile[0]))
  }
  else if (req.method === 'GET' && req.url === '/pets/1') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(sourceFile[1]))
  }
  else if (req.method === 'GET' && req.url === '/pets/2') {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
  }
  else if (req.method === 'GET' && req.url === '/pets/-1') {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
  }
})



server.listen(port, function() {
  console.log('Listening on port', port)
})


module.exports = server
