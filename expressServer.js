'use stric'
const express = require('express')
const path = require('path')
let fs = require('fs')

const app = express()
const petsPath = path.join(__dirname, 'pets.json')
const port = process.env.PORT || 8000

app.disable('x-powered-by')
app.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err
    const pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

app.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) throw err
    let idx = Number(req.params.id)
    const pets = JSON.parse(petsJSON)
    if (idx < 0 || idx > pets.length - 1 || isNaN(idx)) {
      res.sendStatus(404)
    }
    res.send(pets[idx])
  })
})

app.use((req, res) => {
  res.sendStatus(404)
})
app.listen(port, () => {
  console.log('Listening on port', port)
})
module.exports = app
