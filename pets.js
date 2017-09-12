'use strict'

let fs = require('fs')
let path = require('path')
let animalPath = path.join(__dirname, 'pets.json')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]
let ind = process.argv[3]

if (cmd === 'read') {
  fs.readFile(animalPath, 'utf8', function(err, data) {
    if (err) {
      throw err
      process.exit(1)
    }

    let animals = JSON.parse(data)
    if (ind) {
      if (animals[ind] == undefined) {
        console.error(`Usage: ${node} ${file} read INDEX`);
      }
      else {
        console.log(animals[ind])
      }
    }
    else {
      console.log(animals)
    }
  })
}
else if (cmd === 'create') {
  fs.readFile(animalPath, 'utf8', function(err, data) {
    if (err) {
      throw err
      process.exit(1)
    }

    let animals = JSON.parse(data)
    let age = Number(process.argv[3])
    let kind = process.argv[4]
    let name = process.argv[5]
    let animal = {}

    if (!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1)
    }
    else {
      animal = {
        "age": age,
        "kind": kind,
        "name": name
      }
      animals.push(animal)

      let animalsJSON = JSON.stringify(animals)

      fs.writeFile(animalPath, animalsJSON, function(err) {
        if (err) {
          throw err
        }
        console.log(animal)
      })
    }
  })
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1)
}
