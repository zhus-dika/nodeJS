const express = require('express')
const router = express.Router()

const ctrlHome = require('../controllers/home')
const ctrlLogin = require('../controllers/login')
//const ctrlAdminUpload = require('../controllers/admin/upload')
//const ctrlAdminSkills = require('../controllers/admin/skills')


router.get('/', ctrlHome.get)
router.post('/', ctrlHome.post)
router.get('/login', ctrlLogin.get)
router.post('/login', ctrlLogin.post)
//router.post('/admin/upload', ctrlAdminUpload.post)
//router.post('/admin/upload', ctrlAdminSkills.post)

module.exports = router
