var co = require('co');
// 导入模型
const transaction = require('../../entity/transaction').transaction;
const game = require('../../entity/game').game;
const user = require('../../entity/user').user;
const modul = require('../../entity/module').modul;
// 关联对象
transaction.belongsTo( game, { foreignKey: 'game_id' });
transaction.belongsTo( user, { foreignKey: 'me',as:'out' });
transaction.belongsTo( user, { foreignKey: 'other',as:'in' });
transaction.belongsTo( modul, { foreignKey: 'module_id' });

module.exports = {
    // 查询所有
    findAll(req,res){
        transaction.findAll({
            include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        transaction.findOne({
            where:{ 'id':req.query.transaction_id },
            include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
}