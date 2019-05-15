const router = require('koa-router')()

const users = require('./users')


router.use('/users', users.routes(), users.allowedMethods())


module.exports = router
