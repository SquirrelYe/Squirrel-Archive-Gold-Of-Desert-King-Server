const mailUtil = require("./mailUtils");

module.exports = {
  //login注册验证
  register: function (req, res) {
    var mail_address = req.query.mail_address;
    var code = req.query.code;
    var msg = `
        <h3>沙漠掘金</h3>
        <br> 您的验证码为：
        <br> <h3>${code}</h3>
        `;
    mailUtil(`${mail_address}`, `沙漠掘金系统 验证短信...`, msg, res);
  },
};
