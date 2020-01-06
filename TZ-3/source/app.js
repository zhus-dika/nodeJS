//nodemon --ignore models/ app.js
const express = require('express')
const path = require('path')
const app = express()

// view engine setup
//console.log(__dirname)
app.set('views', path.join(__dirname, 'template'))
app.set('view engine', 'pug')

app.use(express.static('../public'))

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/index'))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.render('error', { message: err.message, error: err })
})

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port)
})
