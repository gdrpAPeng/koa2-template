/*
 * @Author: APeng 
 * @Date: 2019-05-15 15:17:07 
 * @Last Modified by: APeng
 * @Last Modified time: 2019-05-15 15:22:06
 */
const router = require('koa-router')()

// router.prefix('/users')

const userController =  require('../controllers/userController')

router.post('/', userController.getUserInfo)


module.exports = router
