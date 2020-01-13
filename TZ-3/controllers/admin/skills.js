const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../../models/db')
const setSkill = (key, val) => {
  db
    .get('skills')
    .find({id: key})
    .assign({'number': parseInt(val)})
    .write()
}
module.exports.post = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields) {
    if (err) {
      return next(err)
    }
    if(fields.age) {
      setSkill('age', fields.age)
    }
    if(fields.concerts) {
      setSkill('concerts', fields.concerts)
    }
    if(fields.cities) {
      setSkill('cities', fields.cities)
    }
    if(fields.years) {
      setSkill('years', fields.years)
    }
  })
  req.flash('msgskill','Скиллы записаны в json')
  res.render('../template/pages/admin', { msgskill: req.flash('msgskill')})
}
