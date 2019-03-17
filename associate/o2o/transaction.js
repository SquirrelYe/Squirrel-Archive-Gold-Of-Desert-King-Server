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
    // 查询所有 localhost:11111/ass/transaction?judge=0
    findAll(req,res){
        transaction.findAndCountAll({
            include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询 localhost:11111/ass/transaction?judge=1&transaction_id=1
    findById(req,res){
        transaction.findOne({
            where:{ 'id':req.query.transaction_id },
            include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按me_id查询 localhost:11111/ass/transaction?judge=2&user_id=1
    findByMe(req,res){
        transaction.findAndCountAll({
            where:{ 'me':req.query.user_id },
            include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按other_id查询 localhost:11111/ass/transaction?judge=3&user_id=1
    findByOther(req,res){
        transaction.findAndCountAll({
            where:{ 'other':req.query.user_id },
            include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按other_id查询 localhost:11111/ass/transaction?judge=4&user_id=1
    findByMeOther(req,res){
        transaction.findAndCountAll({
            where:{ 
                    $or:[
                        {'me':req.query.user_id},
                        {'other':req.query.user_id}
                    ] 
                },
                include: [{ model: game },{ model: user,as:'out' },{ model: user,as:'in' },{ model: modul }]
            }).then( msg => { res.send(msg); })
    },
}