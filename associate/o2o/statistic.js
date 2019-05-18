var co = require('co');
// 导入模型
const statistic = require('../../entity/statistic').statistic;
const game = require('../../entity/game').game;
const team = require('../../entity/team').team;
const modul = require('../../entity/module').modul;
const statistic_module = require('../../entity/statistic_module').statistic_module;

// 关联对象
statistic.belongsTo( game, { foreignKey: 'game_id' });
statistic.belongsTo( team, { foreignKey: 'team_id' });
// 关联对象 n:m
statistic.belongsToMany( modul, {'through': statistic_module} );
modul.belongsToMany( statistic, {'through': statistic_module} );

module.exports = {
    // 查询所有  localhost:11111/ass/statistic?judge=0
    findAndCountAll(req,res){
        statistic.findAndCountAll({
            include: [{ model : game },{ model : team },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询 localhost:11111/ass/statistic?judge=1&statistic_id=1
    findById(req,res){
        statistic.findOne({
            where:{ 'id':req.query.statistic_id },
            include: [{ model : game },{ model : team },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按game_id查询  localhost:11111/ass/statistic?judge=2&game_id=1
    findByGameId(req,res){
        statistic.findAndCountAll({
            where:{ 'game_id':req.query.game_id },
            include: [{ model : game },{ model : team },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
}