const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../../models/db')

module.exports.post = (req, res, next) => {
  let skillValues =db.getSkills()
  let skills = [
    {
      "number": skillValues.age.number,
      "text": skillValues.age.text
    },
    {
      "number": skillValues.concerts.number,
      "text": skillValues.concerts.text
    },
    {
      "number": skillValues.cities.number,
      "text": skillValues.cities.text
    },
    {
      "number": skillValues.years.number,
      "text": skillValues.years.text
    }
  ]
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields) {
    if (err) {
      return next(err)
    }
    if(fields.age) {
      skills[0].number = fields.age
      db.setSkill('age', fields.age)
    }
    if(fields.concerts) {
      skills[1].number = fields.concerts
      db.setSkill('concerts', fields.concerts)
    }
    if(fields.cities) {
      skills[2].number = fields.cities
      db.setSkill('cities', fields.cities)
    }
    if(fields.years) {
      skills[3].number = fields.years
      db.setSkill('years', fields.years)
    }
    req.flash('msgskill','Скиллы записаны в json')
    res.render('../template/pages/admin', { msgskill: req.flash('msgskill'), skills: skills})
  })
}
