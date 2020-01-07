const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../../models/db')

module.exports.post = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields) {
    if (err) {
      return next(err)
    }
    const valid = validation(fields)
    if (valid.err) {
      return res.redirect(`/?msg=${valid.status}`)
    }
    db.get('skills')
    .push({ age: fields.age, concerts: fields.concerts, cities: fields.cities, years: fields.years})
    .write()
  })
  res.redirect('/?msg=Скиллы записаны в json')
}

const validation = (fields) => {
  if (!fields.age) {
    return { status: 'Не указано age!', err: true }
  }
  if (!fields.concerts) {
    return { status: 'Не указано concerts!', err: true }
  }
  if (!fields.cities) {
    return { status: 'Не указано cities!', err: true }
  }
  if (!fields.years) {
    return { status: 'Не указано years!', err: true }
  }
  return { status: 'Ok', err: false }
}
