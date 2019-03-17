const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let team = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'team',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'condition': { 'type': Sequelize.INTEGER(2), 'allowNull': tureOrFalse },
        'currentday': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'currentposition': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
    }
);

module.exports = {
    // 模型实体
    team,
    // 查询所有
    findAndCountAll(req,res){
        team.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        team.create({
            'id':null,
            'game_id':req.query.game_id,
            'condition':req.query.condition,
            'currentday':req.query.currentday,
            'currentposition':req.query.currentposition
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        team.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        team.update(
            {
                'game_id':req.query.game_id,
                'condition':req.query.condition,
                'currentday':req.query.currentday,
                'currentposition':req.query.currentposition
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};