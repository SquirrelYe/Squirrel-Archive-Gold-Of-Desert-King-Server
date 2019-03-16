const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let modul = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'module',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'type': { 'type': Sequelize.INTEGER(2), 'allowNull': tureOrFalse },
        'price': { 'type': Sequelize.DOUBLE(10), 'allowNull': tureOrFalse },
        'weight': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'village': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'time': { 'type': Sequelize.INTEGER(2), 'allowNull': tureOrFalse }
    }
);

module.exports = {
    // 模型实体
    modul,
    // 查询所有
    findAll(req,res){
        modul.findAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        modul.create({
            'id':null,
            'game_id':req.query.game_id,
            'type':req.query.type,
            'price':req.query.price,
            'weight':req.query.weight,
            'village':req.query.village,
            'time':req.query.time
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        modul.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        modul.update(
            {
                'game_id':req.query.game_id,
                'type':req.query.type,
                'price':req.query.price,
                'weight':req.query.weight,
                'village':req.query.village,
                'time':req.query.time
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};