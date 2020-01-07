const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../models/db')
 
module.exports.get = (req, res, next) => {
  res.render('../template/pages/login')
}
db.defaults({ users: [], messages: [], skills: [], upload: [] })
.write()
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
    db.get('users')
    .push({ email: fields.email, password: fields.password})
    .write()
  })
  res.redirect('/?msg=Данные успешно записаны в json')
}

const validation = (fields) => {
  if (!fields.email) {
    return { status: 'Не указан email!', err: true }
  }
  if (!fields.password) {
    return { status: 'Не указан password!', err: true }
  }
  return { status: 'Ok', err: false }
}
