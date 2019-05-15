const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: 3306,
    multipleStatements: true
}

// 创建连接池
const pool = mysql.createPool(config)

// 执行 sql
const query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query
}