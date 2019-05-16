const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let route = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'route',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'team_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'map_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse }
    }
);


module.exports = {
    // 模型实体
    route,
    // 查询所有
    findAndCountAll(req,res){
        route.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        route.create({
            'id':null,
            'team_id':req.query.team_id,
            'game_id':req.query.game_id,
            'map_id':req.query.map_id
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        route.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        route.update(
            {
                'team_id':req.query.team_id,
                'game_id':req.query.game_id,
                'map_id':req.query.map_id
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};