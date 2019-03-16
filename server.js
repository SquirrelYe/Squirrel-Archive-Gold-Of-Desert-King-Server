const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const log = require('./log/log')

// 路由
const entity = require('./route/entity')
const association = require('./route/association')

//测试
// const oneToOne=require('./interface/test/oneToOne')
// const oneToMany=require('./interface/test/oneToMany')
// const manyToMany=require('./interface/test/manyToMany')

//dest指定上传文件地址
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

//测试
//-----------------------------------------------------------------------------------
// server.use('/onetoone',function(req,res){
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     if(req.query.judge==-1) oneToOne.creat(req,res);
//     if(req.query.judge==0) oneToOne.add(req,res);
//     if(req.query.judge==1) oneToOne.update(req,res);
//     if(req.query.judge==2) oneToOne.del(req,res);
//     if(req.query.judge==3) oneToOne.find(req,res);
// })

// server.use('/onetomany',function(req,res){
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     if(req.query.judge==-1) oneToMany.creat(req,res);
//     if(req.query.judge==0) oneToMany.add(req,res);
//     if(req.query.judge==1) oneToMany.update(req,res);
//     if(req.query.judge==2) oneToMany.del(req,res);
//     if(req.query.judge==3) oneToMany.find(req,res);
// })

// server.use('/manytomany',function(req,res){
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     if(req.query.judge==-1) manyToMany.create(req,res);
//     if(req.query.judge==0) manyToMany.add(req,res);
//     if(req.query.judge==1) manyToMany.update(req,res);
//     if(req.query.judge==2) manyToMany.del(req,res);
//     if(req.query.judge==3) manyToMany.find(req,res);
// })