const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const db = require('../models/db')
const config = require('../config.json')
/*==============================================*/
module.exports.index = async (ctx, next) => {
    await ctx.render('pages/index')
  }
  /*==============================================*/
module.exports.auth = async(ctx) => {
  let fields = ctx.request.body
  const valid = validation(fields)
  if (valid.err) {
    return ctx.redirect(`/?msg=${valid.status}`)
  }
  db.get('users')
  .push({ email: fields.email, password: fields.password})
  .write()
  await ctx.redirect('/?msg=Авторизация прошла успешно')
}
const validation = (fields) => {
  if (!fields.email) {
    return { status: 'Не указан email!', err: true }
  }
  if (!fields.password) {
    return { status: 'Не указан password!', err: true }
  }
  return { status: 'Ok', err: false }
}
/*==============================================*/
/*module.exports.message = async (ctx, next) => {
  const transporter = nodemailer.createTransport(config.mail.smtp)
  const fileds = ctx.request.body 
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
      return ctx.res.json({
        msg: `При отправке письма произошла ошибка!: ${error}`,
        status: 'Error'
      })
    }
    ctx.json({ msg: 'Письмо успешно отправлено!', status: 'Ok' })
  })
    ctx.redirect('/?msg=Сообщение успешно отправлено')
  }*/

/*==============================================*/
module.exports.login = async(ctx, next) => {
  await ctx.render('pages/login')
}
/*==============================================*/
module.exports.admin = async (ctx, next) => {
  await ctx.render('pages/admin')
}