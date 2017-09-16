'use strict'

let fs = require('fs')
let path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000

const morgan = require('morgan')
const bodyParser = require('body-parser')

app.disable('x-powered-by')
app.use(morgan('short'))
app.use(bodyParser.json())

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      throw err
    }
    const pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      throw err
    }
    let idx = Number(req.params.id)
    const pets = JSON.parse(petsJSON)
    if (idx < 0 || idx > pets.length - 1 || isNaN(idx)) {
      res.sendStatus(404)
    }
    res.send(pets[idx])
  })
})

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      throw err
      res.sendStatus(400)
    }
    const pets = JSON.parse(petsJSON)
    let newPet = req.body

    if(!newPet) {
      return res.sendStatus(400)
    }

    pets.push(newPet)

    let newPetJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetJSON, function(err) {
      if (err) {
        res.sendStatus(400)
      }
      res.send(newPet)
    })
  })
})


app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = app
