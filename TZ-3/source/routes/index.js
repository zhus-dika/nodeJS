const express = require('express')
const router = express.Router()

const ctrlHome = require('../controllers/home')
const ctrlLogin = require('../controllers/login')
const ctrlAdminUpload = require('../controllers/admin/upload')
const ctrlAdmin = require('../controllers/admin/admin')
const ctrlAdminSkills = require('../controllers/admin/skills')


router.get('/', ctrlHome.get)
router.post('/', ctrlHome.post)
router.get('/login', ctrlLogin.get)
router.post('/login', ctrlLogin.post)
router.get('/admin', ctrlAdmin.get)
router.post('/admin/upload', ctrlAdminUpload.post)
router.post('/admin/skills', ctrlAdminSkills.post)

module.exports = router
