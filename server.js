const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const log = require('./log/log')

// 路由
const entity = require('./route/entity')
const association = require('./route/association')

// dest指定上传文件地址
var objmulter = multer({
    dest: "./www/upload"
});

var server = express();
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(objmulter.any());
server.use(express.static(__dirname));

server.use(log.log4js.connectLogger(log.loggerExpress))

process.on('uncaughtException', function (err) {
    //打印出错误
    console.error(err);
    //打印出错误的调用栈方便调试
    console.error(err.stack);
});

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(express.static(__dirname));

server.use('/', function (req, res, next) {
    // if(req.query.name != 'yx') res.send('error');
    // else next();
    next();
});
// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);

server.get('/index', function (req, res) {
    res.redirect('./WWW/cs.html');
});

// 监听端口
server.listen(11111);