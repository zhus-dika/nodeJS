const path = require('path')
const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')
const controllers = require('../controllers')

router.get('/', controllers.index)
//router.post('/', controllers.message)
router.get('/login', controllers.login)
router.post('/login', koaBody({
    multipart: true
}), controllers.auth)
router.get('/admin', controllers.admin)
/*router.post('/admin/upload', koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(process.cwd(), 'public', 'upload')
    }
}),controllers.upload)
router.post('/admin/skills', koaBody({
    multipart: true
}),controllers.skills)*/

module.exports = router
