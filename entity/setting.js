const Sequelize = require("sequelize");
const conn = require("../orm/orm").connection();
const tureOrFalse = require("./TrueOrFalse").judge;

// 模型层定义
let setting = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "setting",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: tureOrFalse,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
    user_id: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
    diggold: { type: Sequelize.INTEGER(1), allowNull: tureOrFalse },
    diecondition: { type: Sequelize.INTEGER(1), allowNull: tureOrFalse },
    lostday: { type: Sequelize.INTEGER(1), allowNull: tureOrFalse },
    lostconsume: { type: Sequelize.INTEGER(1), allowNull: tureOrFalse },
    beforetime: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
    daytime: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
    usecondition: { type: Sequelize.INTEGER(1), allowNull: tureOrFalse },
  }
);

module.exports = {
  // 模型实体
  setting,
  // 查询所有
  findAndCountAll(req, res) {
    setting.findAndCountAll().then((msg) => {
      res.send(msg);
    });
  },
  // 新建信息
  create(req, res) {
    setting
      .create({
        id: null,
        game_id: req.query.game_id,
        user_id: req.query.user_id,
        diggold: req.query.diggold,
        diecondition: req.query.diecondition,
        lostday: req.query.lostday,
        lostconsume: req.query.lostconsume,
        beforetime: req.query.beforetime,
        daytime: req.query.daytime,
        usecondition: req.query.usecondition,
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  // 删除信息
  delete(req, res) {
    setting
      .destroy({
        where: { id: req.query.id },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  //更新信息
  update(req, res) {
    setting
      .update(
        {
          game_id: req.query.game_id,
          user_id: req.query.user_id,
          diggold: req.query.diggold,
          diecondition: req.query.diecondition,
          lostday: req.query.lostday,
          lostconsume: req.query.lostconsume,
          beforetime: req.query.beforetime,
          daytime: req.query.daytime,
          usecondition: req.query.usecondition,
        },
        { where: { id: req.query.id } }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
};
