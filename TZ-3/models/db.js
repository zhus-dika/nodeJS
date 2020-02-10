const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./models/db.json')
const db = low(adapter)
module.exports = db
module.exports.getSkills = () => {
    return {
      age: {
        number: module.exports
      .get('skills')
      .find({id: 'age'})
      .get('number')
      .value(),
      text: db
      .get('skills')
      .find({id: 'age'})
      .get('text')
      .value()
      },
      concerts: {
        number: module.exports
      .get('skills')
      .find({id: 'concerts'})
      .get('number')
      .value(),
      text: db
      .get('skills')
      .find({id: 'concerts'})
      .get('text')
      .value()
      },
      cities: {
        number: module.exports
      .get('skills')
      .find({id: 'cities'})
      .get('number')
      .value(),
      text: db
      .get('skills')
      .find({id: 'cities'})
      .get('text')
      .value()
      },
      years: {
        number: module.exports
      .get('skills')
      .find({id: 'years'})
      .get('number')
      .value(),
      text: module.exports
      .get('skills')
      .find({id: 'years'})
      .get('text')
      .value()
      }
    }
  }
module.exports.getProducts = (id) => {
    //если список продуктов пуст
    if (!module.exports
      .get('products')
      .find({id: id})
      .get('photo')
      .value()) return
    return {
      src: module.exports
      .get('products')
      .find({id: id})
      .get('photo')
      .value().slice(7),
      name: module.exports
      .get('products')
      .find({id: id})
      .get('name')
      .value(),
      price: module.exports
      .get('products')
      .find({id: id})
      .get('price')
      .value()
    }
  }
 module.exports.getProductsNumber = () => {
    return module.exports
    .get('products')
    .value()
    .length
  }
  module.exports.setSkill = (key, val) => {
    module.exports
      .get('skills')
      .find({id: key})
      .assign({'number': parseInt(val)})
      .write()
  }