const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const db = require('../models/db')
const config = require('../config.json')
const getSkills = () => {
  return {
    age: {
      number: db
    .get('skills')
    .find({id: 'age'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'age'})
    .get('text')
    .value()
    },
    concerts: {
      number: db
    .get('skills')
    .find({id: 'concerts'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'concerts'})
    .get('text')
    .value()
    },
    cities: {
      number: db
    .get('skills')
    .find({id: 'cities'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'cities'})
    .get('text')
    .value()
    },
    years: {
      number: db
    .get('skills')
    .find({id: 'years'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'years'})
    .get('text')
    .value()
    }
  }
}
const getProducts = (id) => {
  //если список продуктов пуст
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