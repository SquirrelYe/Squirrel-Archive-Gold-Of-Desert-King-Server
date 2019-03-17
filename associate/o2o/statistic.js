var co = require('co');
// 导入模型
const statistic = require('../../entity/statistic').statistic;
const team = require('../../entity/team').team;
const game = require('../../entity/game').game;
// 关联对象
statistic.belongsTo( team, { foreignKey: 'team_id' });
statistic.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        statistic.findAndCountAll({
            include: [{ model: team },{ model : game }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        statistic.findOne({
            where:{ 'id':req.query.statistic_id },
            include: [{ model: team },{ model : game }] //{model:company,as:'other_1'}
        }).then( msg => { res.send(msg); })
    },
}