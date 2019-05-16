const router = require('koa-router')()

const users = require('./users')
const tools = require('./tools')


router.use('/users', users.routes(), users.allowedMethods())
router.use('/tools', tools.routes(), tools.allowedMethods())


module.exports = router
