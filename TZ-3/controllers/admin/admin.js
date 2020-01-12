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
    res.render('../template/pages/admin')
  }])