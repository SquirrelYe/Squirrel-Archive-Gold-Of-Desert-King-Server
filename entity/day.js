const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let day = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'day',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'day': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'whether_desert': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'whether_oasis': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'whether_village': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'whether_gold': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
    }
);

module.exports = {
    // 模型实体
    day,
    // 查询所有
    findAll(req,res){
        day.findAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        day.create({
            'id':null,
            'day':req.query.day,
            'game_id':req.query.game_id,
            'whether_desert':req.query.whether_desert,
            'whether_oasis':req.query.whether_oasis,
            'whether_village':req.query.whether_village,
            'whether_gold':req.query.whether_gold
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        day.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        day.update(
            {
                'day':req.query.day,
                'game_id':req.query.game_id,
                'whether_desert':req.query.whether_desert,
                'whether_oasis':req.query.whether_oasis,
                'whether_village':req.query.whether_village,
                'whether_gold':req.query.whether_gold
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};