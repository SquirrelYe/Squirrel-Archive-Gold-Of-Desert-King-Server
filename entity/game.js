const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let game = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'game',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse },
        'icon': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse },
        'start': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse },
        'stay': { 'type': Sequelize.CHAR(125), 'allowNull': tureOrFalse },
        'condition': { 'type': Sequelize.INTEGER(2), 'allowNull': tureOrFalse },
        'detail': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'day_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
    }
);

module.exports = {
    // 模型实体
    game,
    // 查询所有
    findAll(req,res){
        game.findAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        game.create({
            'id':null,
            'name':req.query.name,
            'icon':req.query.icon,
            'start':req.query.start,
            'stay':req.query.stay,
            'condition':req.query.condition,
            'detail':req.query.detail,
            'day_id':req.query.day_id,
            'user_id':req.query.user_id
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        game.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        game.update(
            {
                'name':req.query.name,
                'icon':req.query.icon,
                'start':req.query.start,
                'stay':req.query.stay,
                'condition':req.query.condition,
                'detail':req.query.detail,
                'day_id':req.query.day_id,
                'user_id':req.query.user_id
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};