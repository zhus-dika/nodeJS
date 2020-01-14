const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const db = require('../../models/db')
const getSkills = () => {
  return {
    age: {
      number: db
    .get('skills')
    .find({id: 'age'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'age'})
    .get('text')
    .value()
    },
    concerts: {
      number: db
    .get('skills')
    .find({id: 'concerts'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'concerts'})
    .get('text')
    .value()
    },
    cities: {
      number: db
    .get('skills')
    .find({id: 'cities'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'cities'})
    .get('text')
    .value()
    },
    years: {
      number: db
    .get('skills')
    .find({id: 'years'})
    .get('number')
    .value(),
    text: db
    .get('skills')
    .find({id: 'years'})
    .get('text')
    .value()
    }
  }
}
const setSkill = (key, val) => {
  db
    .get('skills')
    .find({id: key})
    .assign({'number': parseInt(val)})
    .write()
}
module.exports.post = (req, res, next) => {
  let skillValues = getSkills()
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
      setSkill('age', fields.age)
    }
    if(fields.concerts) {
      skills[1].number = fields.concerts
      setSkill('concerts', fields.concerts)
    }
    if(fields.cities) {
      skills[2].number = fields.cities
      setSkill('cities', fields.cities)
    }
    if(fields.years) {
      skills[3].number = fields.years
      setSkill('years', fields.years)
    }
    req.flash('msgskill','Скиллы записаны в json')
    res.render('../template/pages/admin', { msgskill: req.flash('msgskill'), skills: skills})
  })
}
