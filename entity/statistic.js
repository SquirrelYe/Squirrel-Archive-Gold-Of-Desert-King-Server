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
        'team_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'money': { 'type': Sequelize.DOUBLE(11), 'allowNull': tureOrFalse },
        'load': { 'type': Sequelize.DOUBLE(11), 'allowNull': tureOrFalse },
    }
);

module.exports = statistic;