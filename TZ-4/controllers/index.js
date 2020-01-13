const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const db = require('../models/db')
const config = require('../config.json')
/*==============================================*/
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
const getProductsNumber = () => {
  return db
  .get('products')
  .value()
  .length
}
module.exports.index = async (ctx, next) => {
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
  await ctx.render('pages/index', {skills: skills, products: products})
}
  /*==============================================*/
  module.exports.auth = async(ctx) => {
  let fields = ctx.request.body
  const email = db.get('users').get('email').value()
  const pswd = db.get('users').get('password').value()
  if (fields.email === email && fields.password == pswd) {
    ctx.session.isAdmin = true
    ctx.redirect('/admin')
  }
  ctx.flash('msglogin', 'Вы не авторизованы')
  await ctx.render('pages/login', { msglogin: ctx.flash('msglogin')})
}
/*==============================================*/
module.exports.message = async(ctx, next) => {
  const transporter = nodemailer.createTransport(config.mail.smtp)
  const fields = ctx.request.body 
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
      return ctx.json({
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error'
      })
    }
  })
  ctx.flash('msgemail', 'Сообщение успешно отправлено')
  await ctx.render('pages/index', {msgemail: ctx.flash('msgemail')})
  }

/*==============================================*/
module.exports.login = async(ctx, next) => {
  ctx.flash('msglogin', 'Вы не авторизованы')
  await ctx.render('pages/login', { msglogin: ctx.flash('msglogin')})
}
/*==============================================*/
const isAdmin = (ctx, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (ctx.session.isAdmin) {
    // то всё хорошо :)
    
    return next()
  }
  // если нет, то перебросить пользователя на страницу login
  ctx.redirect('/login')
}
module.exports.admin = async (ctx, next) => {
  isAdmin(ctx, next)
  await ctx.render('pages/admin')
}
/*==============================================*/
const setSkill = (key, val) => {
  db
    .get('skills')
    .find({id: key})
    .assign({'number': parseInt(val)})
    .write()
}
module.exports.skills = async(ctx) => {
  let fields = ctx.request.body
  if(fields.age) {
    setSkill('age', fields.age)
  }
  if(fields.concerts) {
    setSkill('concerts', fields.concerts)
  }
  if(fields.cities) {
    setSkill('cities', fields.cities)
  }
  if(fields.years) {
    setSkill('years', fields.years)
  }
  ctx.flash('msgskill', 'Данные успешно записаны в json')
  await ctx.render('pages/admin', { msgskill: ctx.flash('msgskill')})
}

/*==============================================*/
module.exports.upload= async(ctx) => {
  let fields = ctx.request.body
  let files = ctx.request.files
  let upload = path.join('public','assets', 'img', 'products')
  const fileName = path.join(upload, files.photo.name)
    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }
    })
    let count = getProductsNumber()
    db.get('products')
      .push({ id: count++, photo: fileName, name: fields.name, price: fields.price})
      .write()
    ctx.flash('msgfile','Картинка успешно загружена')
    await  ctx.render('../template/pages/admin', { msgfile: ctx.flash('msgfile') })
}