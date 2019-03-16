var co = require('co');
// 导入模型
const user = require('../../entity/user');
const team = require('../../entity/team');
// 关联
user.hasOne(team, {
    foreignKey: 'team_id',
    constraints: false
});
team.belongsTo(user, {
    foreignKey: 'team_id',
    constraints: false
});


module.exports = {
    add: function (req, res) {
        co(function* () {
            var miniyield1 = yield miniyield.create({'id':req.query.miniyield_id}); 
            var source1 = yield source.findById(req.query.source_id)  
            yield miniyield1.setSource(source1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var miniyield1 = yield miniyield.findById(req.query.miniyield_id)  
            var source1 = yield source.findById(req.query.source_id)  
            yield miniyield1.setSource(source1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var miniyield1 = yield miniyield.findById(req.query.miniyield_id)  
            yield miniyield1.setSource(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_source: function (req, res) {
        source.findAll({
            include: {
                model: miniyield, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_miniyield:function(req,res){
        miniyield.findAll({
            include: {
                model: source, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    findByCompany:function(req,res){
        miniyield.findAll({
            where:{
                'company_id':req.query.company_id,
            },
            include: {
                model: source, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}