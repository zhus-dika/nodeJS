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

module.exports.get =([isAdmin, (req, res, next) => {
  let skillValues=db.getSkills()
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