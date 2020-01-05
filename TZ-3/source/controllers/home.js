module.exports.get = function (req, res) {
    res.render('../../template/pages/index')
  }
module.exports.post = function (req, res) {
    res.json({ name: 'name',
                email: 'email',
                message: 'message'})
  }