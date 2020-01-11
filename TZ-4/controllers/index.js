const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const db = require('../models/db')
const config = require('../config.json')
/*==============================================*/
module.exports.index = async (ctx, next) => {
    await ctx.render('pages/index', {msgemail: ctx.flash('msgemail')})
  }
  /*==============================================*/
  module.exports.auth = async(ctx) => {
  let fields = ctx.request.body
  db.get('users')
  .push({ email: fields.email, password: fields.password})
  .write()
  ctx.flash('msglogin', 'Авторизация прошла успешно')
  await ctx.redirect('/login')
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
  await ctx.redirect('/')
  }

/*==============================================*/
module.exports.login = async(ctx, next) => {
  await ctx.render('pages/login', { msglogin: ctx.flash('msglogin')})
}
/*==============================================*/
module.exports.admin = async (ctx, next) => {
  await ctx.render('pages/admin', { msgskill: ctx.flash('msgskill'), msgfile: ctx.flash('msgfile')})
}
/*==============================================*/
module.exports.skills = async(ctx) => {
  let fields = ctx.request.body
  db.get('skills')
  .push({ age: fields.age, concerts: fields.concerts, cities: fields.cities, years: fields.years})
  .write()
  ctx.flash('msgskill', 'Данные успешно записаны в json')
  await ctx.redirect('/admin')
}
/*==============================================*/
module.exports.upload= async(ctx) => {
  let fields = ctx.request.body
  let files = ctx.request.files
  db.get('upload')
  .push({ photo: files.photo.path, name: fields.name, price: fields.price})
  .write()
  ctx.flash('msgfile', 'Картинка успешно загружена')
  await ctx.redirect('/admin')
}