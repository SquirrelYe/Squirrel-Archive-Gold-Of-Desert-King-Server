const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mail = require('./mail/mail')
const test = require('./interface/test/test')
const log=require('./log/log')

// const admin = require('./interface/user&admin/admin')

//关系
const route=require('./route/route')

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
server.listen(11111);

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
    next();
});
// 加载外部router
server.use('/ass',route);

server.get('/index', function (req, res) {
    res.redirect('./WWW/cs.html');
});

server.use('/admin', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    // if(req.query.judge==0) admin.login(req, res)
    // if(req.query.judge==1) admin.findAll(req, res)
    // if(req.query.judge==2) admin.delete(req,res)
    // if(req.query.judge==3) admin.findById(req,res)
});

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