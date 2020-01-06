const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../models/db')
module.exports.get = function (req, res) {
    res.render('../template/pages/index')
  }
    // Set some defaults
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
      db.get('messages')
      .push({name: fields.name, email: fields.email, message: fields.message})
      .write()
    })
    res.redirect('/?msg=Сообщение успешно отправлено')
  }
  
  const validation = (fields) => {
    if (!fields.name) {
        return { status: 'Не указано имя!', err: true }
      }
    if (!fields.email) {
      return { status: 'Не указан email!', err: true }
    }
    if (!fields.message) {
      return { status: 'Сообщение пусто!', err: true }
    }
    return { status: 'Ok', err: false }
  }