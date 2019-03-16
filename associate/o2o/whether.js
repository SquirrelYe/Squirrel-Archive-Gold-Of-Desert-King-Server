var co = require('co');
// 导入模型
const whether = require('../../entity/whether').whether;
const game = require('../../entity/game').game;
// 关联对象
whether.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 查询所有
    findAll(req,res){
        whether.findAll({
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        whether.findOne({
            where:{ 'id':req.query.whether_id },
            include: { model: game }
        }).then( msg => { res.send(msg); })
    } 
}