/*
 * @Author: APeng 
 * @Date: 2019-05-15 15:17:02 
 * @Last Modified by: APeng
 * @Last Modified time: 2019-05-15 16:09:06
 */

// module.exports = {
//     getUserInfo(ctx) {
//         ctx.type = 'json'
//         ctx.body = ctx.request.body
//     }
// }

const userModel = require('../models/userModel')


class User {
    async getUserInfo(ctx) {
       ctx.body = await userModel.getUserInfo()
    }
}

module.exports = new User()