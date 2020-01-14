const db = require('../../models/db')
const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    // то всё хорошо :)
    
    return next()
  }
  // если нет, то перебросить пользователя на страницу login
  res.redirect('/login')
}
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
module.exports.get =([isAdmin, (req, res, next) => {
  let skillValues=getSkills()
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
    res.render('../template/pages/admin', {skills: skills})
  }])