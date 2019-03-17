const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let whether = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'whether',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse }
    }
);

module.exports = {
    // 模型实体
    whether,
    // 查询所有
    findAndCountAll(req,res){
        whether.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        whether.create({
            'id':null,
            'game_id':req.query.game_id,
            'name':req.query.name
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        whether.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        whether.update(
            {
                'game_id':req.query.game_id,
                'name':req.query.name
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};