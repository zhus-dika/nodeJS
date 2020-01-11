module.exports.get = (req, res, next) => {
    res.render('../template/pages/admin', { msgskill: req.flash('msgskill'), msgfile: req.flash('msgfile') })
  }