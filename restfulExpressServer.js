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
      return res.sendStatus(400)
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

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      throw err
      res.sendStatus(400)
    }
    let idx = Number(req.params.id)
    const pets = JSON.parse(petsJSON)

    if (idx < 0 || idx >= pets.length || Number.isNaN(idx)) {
      return res.sendStatus(404)
    }

    let name = req.body.name
    let age = Number(req.body.age)
    let kind = req.body.kind

    let pet = {name, age, kind}

    if (!pet) {
      return res.sendStatus(400)
    }

    pets[idx] = pet
    let newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        return res.sendStatus(500)
      }
      res.send(req.body)
    })
  })
})

app.delete('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var pet = pets.splice(id, 1)[0];
    var newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      // res.set('Content-Type', 'text/plain');
      res.send(pet);
    });
  });
});

app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

module.exports = app
