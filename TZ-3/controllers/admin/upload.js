const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const db = require('../../models/db')
const getProductsNumber = () => {
  return db
  .get('products')
  .value()
  .length
}
const getSkills = () => {
  return {
    age: {
      number: db
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
      number: db
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
      number: db
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
      number: db
    .get('skills')
    .find({id: 'years'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'years'})
    .get('text')
    .value()
    }
  }
}
module.exports.post = (req, res, next) => {
  let skillValues = getSkills()
  let skills = [
    {
      "number": skillValues.age.number,
      "text": skillValues.age.text
    },
    {
      "number": skillValues.concerts.number,
      "text": skillValues.concerts.text
    },
    {
      "number": skillValues.cities.number,
      "text": skillValues.cities.text
    },
    {
      "number": skillValues.years.number,
      "text": skillValues.years.text
    }
  ]
  let form = new formidable.IncomingForm()
  let upload = path.join('public','assets', 'img', 'products')
  form.uploadDir = upload
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }
    const fileName = path.join(upload, files.photo.name)
    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }
      let count = getProductsNumber()
      db.get('products')
      .push({ id: count++, photo: fileName, name: fields.name, price: fields.price})
      .write()
      req.flash('msgfile','Картинка успешно загружена')
      res.render('../template/pages/admin', { msgfile: req.flash('msgfile'), skills: skills})
    })
  })
}
