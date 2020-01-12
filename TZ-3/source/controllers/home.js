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
  })
    })
    req.flash('msgemail', 'Письмо успешно отправлено!')
    res.render('../template/pages/index', {msgemail: req.flash('msgemail')})
  }