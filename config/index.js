/**
 * Created by wenbo.kuang on 2018/6/4.
 */
module.exports = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 8080),
    logDirectory: "log",
    db: {
        host: '127.0.0.1',
        port: 3306,
        database: "kingbora",
        username: "root",
        password: "520kwb",
        dialect: "mysql"
    }
};