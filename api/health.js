const { handleMethod, sendJson } = require("./_utils");

module.exports = (req, res) => {
  if (!handleMethod(req, res)) {
    return;
  }

  sendJson(res, {
    status: "ok",
    service: "white-coat-vercel-api",
    date: new Date().toISOString()
  });
};
