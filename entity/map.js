const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const tureOrFalse = require('./TrueOrFalse').judge;

// 模型层定义
let map = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'map',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse, 'primaryKey': true, 'autoIncrement': true },
        'game_id': { 'type': Sequelize.INTEGER(11), 'allowNull': tureOrFalse },
        'desert': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse },
        'oasis': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse },
        'tomb': { 'type': Sequelize.CHAR(225), 'allowNull': tureOrFalse },
        'village': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse },
        'gold': { 'type': Sequelize.CHAR(255), 'allowNull': tureOrFalse }
    }
);

module.exports = map;