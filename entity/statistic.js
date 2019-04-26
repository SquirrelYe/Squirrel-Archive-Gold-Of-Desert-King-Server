const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let statistic = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'statistic',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'money': { 'type': Sequelize.DOUBLE(11), 'allowNull': tureOrFalse },
        'load': { 'type': Sequelize.DOUBLE(11), 'allowNull': tureOrFalse },
        'food': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'water': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'compass': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'tent': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'secret': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'gold': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
    }
);

module.exports = {
    // 模型实体
    statistic,
    // 查询所有
    findAndCountAll(req,res){
        statistic.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息  localhost:11111/ent/statistic?judge=1&game_id=1&team_id=1&money=100&load=100
    create(req,res){
        statistic.create({
            'id':null,
            'game_id':req.query.game_id,
            'money':req.query.money,
            'load':req.query.load,
            'food':req.query.food,
            'water':req.query.water,
            'compass':req.query.compass,
            'tent':req.query.tent,
            'secret':req.query.secret,
            'gold':req.query.gold
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        statistic.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    // 更新信息
    update(req,res){
        statistic.update(
            {
                'team_id':req.query.team_id,
                'money':req.query.money,
                'load':req.query.load,
                'food':req.query.food,
                'water':req.query.water,
                'compass':req.query.compass,
                'tent':req.query.tent,
                'secret':req.query.secret,
                'gold':req.query.gold
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    },
    // 按照game_id删除
    deleteAllByGameId(req,res){
        statistic.destroy(
            {
                where:{ 'game_id':req.query.game_id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    }
};