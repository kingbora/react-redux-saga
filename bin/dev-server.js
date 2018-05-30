/**
 * Created by wenbo.kuang on 2018/5/30.
 */
const config = require('../config/server.config');
const server = require('../config/server');
server.listen(config.port, config.host, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is now running at http://${config.host}:${config.port}.`);
});