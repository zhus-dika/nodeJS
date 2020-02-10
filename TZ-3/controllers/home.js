const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const db = require('../models/db')
const config = require('../config.json')

module.exports.get = function (req, res) {
  let skillValues=db.getSkills()
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
  var products = []
  for (let i = 0; ; i++) {
    const val = db.getProducts(i)
    if(val){
      products.push(val)
    } else break
  }
  res.render('../template/pages/index', {skills: skills, products: products})
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
    let skillValues=db.getSkills()
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
    var products = []
    for (let i = 0; ; i++) {
      if(db.getProducts(i)){
        products.push(db.getProducts(i))
      } else break
    }
    req.flash('msgemail', 'Письмо успешно отправлено!')
    res.render('../template/pages/index', {msgemail: req.flash('msgemail'), skills: skills, products: products})
  }