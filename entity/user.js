const Sequelize = require("sequelize");
const conn = require("../orm/orm").connection();
const tureOrFalse = require("./TrueOrFalse").judge;

// 模型层定义
let user = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "user",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: tureOrFalse,
      primaryKey: true,
      autoIncrement: true,
    },
    cname: { type: Sequelize.CHAR(255), allowNull: tureOrFalse },
    name: { type: Sequelize.CHAR(255), allowNull: tureOrFalse },
    pass: { type: Sequelize.CHAR(255), allowNull: tureOrFalse },
    type: { type: Sequelize.INTEGER(1), allowNull: tureOrFalse },
    mail: { type: Sequelize.CHAR(255), allowNull: tureOrFalse },
    phone: { type: Sequelize.CHAR(255), allowNull: tureOrFalse },
    condition: { type: Sequelize.INTEGER(2), allowNull: tureOrFalse },
    team_id: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
    game_id: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
    job: { type: Sequelize.CHAR(255), allowNull: tureOrFalse },
    openid: { type: Sequelize.INTEGER(11), allowNull: tureOrFalse },
  }
);

module.exports = {
  // 模型实体
  user,
  // 查询所有
  findAndCountAll(req, res) {
    user.findAndCountAll().then((msg) => {
      res.send(msg);
    });
  },
  //查询注册时邮箱是否被占用
  selectUsersByEmail(req, res) {
    user
      .findAndCountAll({
        where: { mail: req.query.mail },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  //查询参赛者是否有队伍
  selectUsersHaveTeam(req, res) {
    user
      .findOne({
        attributes: ["team_id"],
        where: { id: req.query.user_id },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  //登录
  login(req, res) {
    user
      .findOne({
        where: {
          name: req.query.name,
          pass: req.query.pass,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  //注册用户
  create(req, res) {
    user
      .findOrCreate({
        where: {
          name: req.query.name,
          mail: req.query.mail,
        },
        defaults: {
          cname: req.query.cname,
          name: req.query.name,
          pass: req.query.pass,
          type: req.query.type,
          mail: req.query.mail,
          phone: req.query.phone,
          condition: req.query.condition,
          openid: req.query.openid,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  //更新密码（密码找回）
  updatePass(req, res) {
    user
      .update(
        { pass: req.query.pass },
        {
          where: { mail: req.query.mail },
        }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
  //删除用户
  delete(req, res) {
    user
      .destroy({
        where: { id: req.query.id },
      })
      .then((msg) => {
        res.send({ affectRows: msg });
      });
  },
  //更新用户信息
  update(req, res) {
    user
      .update(
        {
          cname: req.query.cname,
          name: req.query.name,
          pass: req.query.pass,
          type: req.query.type,
          mail: req.query.mail,
          phone: req.query.phone,
          condition: req.query.condition,
          team_id: req.query.team_id,
          game_id: req.query.game_id,
          job: req.query.job,
          openid: req.query.openid,
        },
        { where: { id: req.query.id } }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
  //查询一支队伍的所有人员信息
  findByTeamId(req, res) {
    user
      .findAndCountAll({
        where: { team_id: req.query.team_id },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  //查询一支队伍的所有人员信息
  findById(req, res) {
    user
      .findOne({
        where: { id: req.query.id },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
