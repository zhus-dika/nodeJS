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

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port)
})
