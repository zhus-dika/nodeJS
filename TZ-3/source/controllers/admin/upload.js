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

    const fileName = path.join(upload, files.photo.name)

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }
      db.get('upload')
      .push({ photo: fileName, name: fields.name, price: fields.price})
      .write()
      req.flash('msgfile','Картинка успешно загружена')
      res.redirect('/admin')
    })
  })
}
