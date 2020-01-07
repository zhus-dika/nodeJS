const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body')({ multipart: true });
const db = require('../models/db')

module.exports.get = async(ctx, next) => {
  await ctx.render('../template/pages/login')
}
db.defaults({ users: [], skills: [], upload: [] })
.write()
module.exports.post = koaBody, (ctx, next) => {
  /*let form = new formidable.IncomingForm()
  console.log(ctx.request.body)
  const {email, password} = ctx.request.body
  /*const valid = validation({email, password})
  if (valid.err) {
    return ctx.redirect(`/?msg=${valid.status}`)
  }
  db.get('users')
  .push({ email: email, password: password})
  .write()*/
  console.log(this.request.body.fields);
  ctx.redirect('/login')//('/?msg=Данные успешно записаны в json')
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
