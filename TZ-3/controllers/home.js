const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const db = require('../models/db')
const config = require('../config.json')
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
const getProducts = (id) => {
  if (!db
    .get('products')
    .find({id: id})
    .get('photo')
    .value()) return
  return {
    src: db
    .get('products')
    .find({id: id})
    .get('photo')
    .value().slice(7),
    name: db
    .get('products')
    .find({id: id})
    .get('name')
    .value(),
    price: db
    .get('products')
    .find({id: id})
    .get('price')
    .value()
  }
}
module.exports.get = function (req, res) {
  let skillValues=getSkills()
  let skills = [
    {
      "number": skillValues.age,
      "text": "Возраст начала занятий на скрипке"
    },
    {
      "number": skillValues.concerts,
      "text": "Концертов отыграл"
    },
    {
      "number": skillValues.cities,
      "text": "Максимальное число городов в туре"
    },
    {
      "number": skillValues.years,
      "text": "Лет на сцене в качестве скрипача"
    }
  ]
  var products = []
  for (let i = 0; ; i++) {
    if(getProducts(i)){
      products.push(getProducts(i))
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
    req.flash('msgemail', 'Письмо успешно отправлено!')
    res.render('../template/pages/index', {msgemail: req.flash('msgemail')})
  }