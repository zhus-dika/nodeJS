const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const db = require('../../models/db')
 
module.exports.post = (req, res, next) => {
  let form = new formidable.IncomingForm()
  let upload = path.join(process.cwd(),'images','products')
  form.uploadDir = upload
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }
    const valid = validation(fields, files)

    if (valid.err) {
      fs.unlinkSync(files.photo.path)
      return res.redirect(`/?msg=${valid.status}`)
    }

    const fileName = path.join(upload, files.photo.name)

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }
      db.get('upload')
      .push({ photo: fileName, name: fields.name, price: fields.price})
      .write()
      res.redirect('/?msg=Картинка успешно загружена')
    })
  })
}

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано имя картинки!', err: true }
  }
  if (!fields.price) {
    return { status: 'Не указано price!', err: true }
  }
  return { status: 'Ok', err: false }
}
