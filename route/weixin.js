const express = require("express");
const router = express.Router();

// -------------实体导入-------------
const wx = require("../utils/wx/wx_api");

module.exports = router;

// 微信相关接口
router.use("/wx", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.query.judge == 0) wx.selectOpenidUnionid(req, res);
  if (req.query.judge == 1) wx.selectAccessToken(req, res);
  if (req.query.judge == 2) wx.sendTemplateMsg(req, res);
  if (req.query.judge == 3) wx.paysign(req, res);
});
