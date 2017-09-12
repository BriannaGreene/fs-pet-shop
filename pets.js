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
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1)
}
