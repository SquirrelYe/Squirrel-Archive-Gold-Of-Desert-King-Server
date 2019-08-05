const express = require('express');
const bodyParser = require('body-parser');
const log = require('./log/log')
const mail = require('./mail/mail')

// 路由
const entity = require('./route/entity')
const association = require('./route/association')
const wx = require('./route/weixin')

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

server.use(express.static(__dirname));

server.use(log.log4js.connectLogger(log.loggerExpress))

process.on('uncaughtException', function (err) {
    //打印出错误
    console.error(err);
    //打印出错误的调用栈方便调试
    console.error(err.stack);
});

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);
server.use('/wx', wx);
server.use('/mail',function(req,res){
    if(req.query.judge==0)  mail.register(req,res);
})

server.get('/index', function (req, res) {
    res.redirect('./WWW/cs.html');
});

// 监听端口
server.listen(11111);