/*
 * @Author: APeng 
 * @Date: 2019-05-15 16:07:13 
 * @Last Modified by: APeng
 * @Last Modified time: 2019-05-15 16:24:46
 */
const db = require('../db')

class User {
    getUserInfo() {
        return db.query(`select * from t_user`)
    }
}

module.exports = new User()