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
  const validationAuth = (fields) => {
    if (!fields.email) {
      return { status: 'Не указан email!', err: true }
    }
    if (!fields.password) {
      return { status: 'Не указан password!', err: true }
    }
    return { status: 'Ok', err: false }
  }
  module.exports.auth = async(ctx) => {
  let fields = ctx.request.body
  const valid = validationAuth(fields)
  if (valid.err) {
    return ctx.redirect(`/?msg=${valid.status}`)
  }
  db.get('users')
  .push({ email: fields.email, password: fields.password})
  .write()
  await ctx.redirect('/?msg=Авторизация прошла успешно')
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
/*==============================================*/
const validationSkills = (fields) => {
  if (!fields.age) {
    return { status: 'Не указано age!', err: true }
  }
  if (!fields.concerts) {
    return { status: 'Не указано concerts!', err: true }
  }
  if (!fields.cities) {
    return { status: 'Не указано cities!', err: true }
  }
  if (!fields.years) {
    return { status: 'Не указано years!', err: true }
  }
  return { status: 'Ok', err: false }
}
module.exports.skills = async(ctx) => {
  let fields = ctx.request.body
  const valid = validationSkills(fields)
  if (valid.err) {
    return ctx.redirect(`/?msg=${valid.status}`)
  }
  db.get('skills')
  .push({ age: fields.age, concerts: fields.concerts, cities: fields.cities, years: fields.years})
  .write()
  await ctx.redirect('/?msg=Данные успешно записаны в json')
}