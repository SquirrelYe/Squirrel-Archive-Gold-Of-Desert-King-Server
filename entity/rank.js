const Sequelize = require("sequelize");
const conn = require("../orm/orm").connection();

// 模型层定义
let rank = conn.define("rank", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  team_id: { type: Sequelize.CHAR(255), allowNull: true },
  game_id: { type: Sequelize.CHAR(255), allowNull: true },
});

module.exports = {
  // 模型实体
  rank,
  // 查询所有
  findAndCountAll(req, res) {
    rank.findAndCountAll().then((msg) => {
      res.send(msg);
    });
  },
  // 新建信息
  create(req, res) {
    rank.create(req.query).then((msg) => {
      res.send(msg);
    });
  },
  // 删除信息
  delete(req, res) {
    const { id } = req.query;
    rank.destroy({ where: { id } }).then((msg) => {
      res.send({ del: msg });
    });
  },
  // 更新信息
  update(req, res) {
    const { id } = req.query;
    rank
      .update(req.query, {
        where: { id },
      })
      .then((msg) => {
        res.send({ upd: msg[0] });
      });
  },
};
