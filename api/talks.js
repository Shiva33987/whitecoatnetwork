const data = require("./_data");
const { handleMethod, sendJson } = require("./_utils");

module.exports = (req, res) => {
  if (!handleMethod(req, res)) {
    return;
  }
  sendJson(res, data.talks);
};
