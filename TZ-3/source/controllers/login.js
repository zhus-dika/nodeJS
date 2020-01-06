const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('./models/db.json')
const db = low(adapter)
 
module.exports.get = (req, res, next) => {
  res.render('../template/pages/login')
}

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
  res.redirect('/')
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
