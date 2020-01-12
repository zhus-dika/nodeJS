const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    // то всё хорошо :)
    
    return next()
  }
  // если нет, то перебросить пользователя страницу login сайта
  console.log(req.session.isAdmin)
  req.flash('msglogin', 'Вы не авторизованы')
  res.redirect('/login')
}
module.exports.get =([isAdmin, (req, res, next) => {
  console.log(req.session.isAdmin)
    res.render('../template/pages/admin')
  }])