const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../../models/db')
const getSkills = () => {
  return {
    age: db
    .get('skills')
    .find({id: 'age'})
    .get('number')
    .value(),
    concerts: db
    .get('skills')
    .find({id: 'concerts'})
    .get('number')
    .value(),
    cities: db
    .get('skills')
    .find({id: 'cities'})
    .get('number')
    .value(),
    years: db
    .get('skills')
    .find({id: 'years'})
    .get('number')
    .value()
  }
}
console.log(getSkills())
module.exports.post = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields) {
    if (err) {
      return next(err)
    }
    db.get('skills')
    .push({ age: fields.age, concerts: fields.concerts, cities: fields.cities, years: fields.years})
    .write()
  })
  req.flash('msgskill','Скиллы записаны в json')
  res.render('../template/pages/admin', { msgskill: req.flash('msgskill')})
}
