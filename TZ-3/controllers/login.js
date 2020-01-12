const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const db = require('../models/db')
module.exports.get = (req, res, next) => {
  req.flash('msglogin', 'Вы не авторизованы')
  res.render('../template/pages/login', { msglogin: req.flash('msglogin')})
}
module.exports.post = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields) {
    if (err) {
      return next(err)
    }
    const email = db.get('users').get('email').value()
    const pswd = db.get('users').get('password').value()
    if (fields.email === email && fields.password == pswd) {
      req.session.isAdmin = true
      res.redirect('/admin')
    } else {
      res.redirect('/login')
    }
  })
}

