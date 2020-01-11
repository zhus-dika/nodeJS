const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const db = require('../models/db')
 
module.exports.get = (req, res, next) => {
  res.render('../template/pages/login', { msglogin: req.flash('msglogin') })
}
db.defaults({ users: [], messages: [], skills: [], upload: [] })
.write()
module.exports.post = (req, res, next) => {
  res.cookie('secretKey', 'admin', {
    httpOnly: true,
    maxAge: 60*1000, 
    path: '/login'
  })
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields) {
    if (err) {
      return next(err)
    }
    db.get('users')
    .push({ email: fields.email, password: fields.password})
    .write()
  })
  req.flash('msglogin', 'Данные успешно записаны в json')
  res.redirect('/login')
}
/*const validation = (fields, err) => {
  if (!fields.email) {
    return { status: 'Не указан email!', err: true }
  }
  if (!fields.password) {
    return { status: 'Не указан password!', err: true }
  }
  return { status: 'Ok', err: false }
}*/

