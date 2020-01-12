//nodemon --ignore models/ app.js
const Koa = require("koa");
const app = new Koa();
const Pug = require("koa-pug")
const static = require("koa-static")
const session = require('koa-generic-session')
const flash = require('koa-better-flash')
const path = require('path')
const router= require('./routes')
const errorHandler = require('./libs/error')
const pug = new Pug({
  viewPath: './template',
  app: app
})
app.use(session())
app.use(flash())
app.use(errorHandler)
app.use(static('./public'))

app
.use(router.routes())
.use(router.allowedMethods());
app.keys = [ 'keys' ]
const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port)
})
