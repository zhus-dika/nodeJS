const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const db = require('../../models/db')
const getProductsNumber = () => {
  for (let i = 0; ; i++) {
    if (!db
      .get('products')
      .find({id: i})
      .get('photo')
      .value()){
      return i
    }
  }
}
module.exports.post = (req, res, next) => {
  let form = new formidable.IncomingForm()
  let upload = path.join('public','assets', 'img', 'products')
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
      let count = getProductsNumber()
      db.get('products')
      .push({ id: count++, photo: fileName, name: fields.name, price: fields.price})
      .write()
      req.flash('msgfile','Картинка успешно загружена')
      res.render('../template/pages/admin', { msgfile: req.flash('msgfile') })
    })
  })
}
