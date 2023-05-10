const rank = require("../../entity/rank").rank;
const game = require("../../entity/game").game;
const team = require("../../entity/team").team;

rank.belongsTo(game, { foreginkey: "game_id" });
game.hasMany(rank);
rank.belongsTo(team, { foreginkey: "team_id" });
team.hasMany(rank);

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    const { offset, limit } = req.query;
    rank
      .findAndCountAll({
        include: [{ model: game }, { model: team }],
        offset: Number(offset),
        limit: Number(limit),
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  // 按id查询
  findOneById(req, res) {
    rank
      .findById(req.query.id, { include: [{ model: game }, { model: team }] })
      .then((msg) => {
        res.send(msg);
      });
  },
  // 按 game id查询
  findOneByGameId(req, res) {
    const game_id = req.query.game_id;
    rank
      .findAndCountAll({
        where: { game_id },
        include: [{ model: game }, { model: team }],
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
