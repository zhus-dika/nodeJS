const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const config = require('../config.json')
module.exports.get = function (req, res) {
    res.render('../template/pages/index')
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
      // инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp)
  const mailOptions = {
    from: `"${fields.name}" <${fields.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      fields.message.trim().slice(0, 500) +
      `\n Отправлено с: <${fields.email}>`
  }
  // отправляем почту
  transporter.sendMail(mailOptions, function (error, info) {
    // если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.json({
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error'
      })
    }
    res.json({ msg: 'Письмо успешно отправлено!', status: 'Ok' })
  })
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