function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function handleMethod(req, res) {
  if (req.method === "OPTIONS") {
    setCors(res);
    res.status(204).end();
    return false;
  }

  if (req.method !== "GET") {
    setCors(res);
    res.status(405).json({ message: "Method not allowed" });
    return false;
  }

  return true;
}

function sendJson(res, payload) {
  setCors(res);
  res.status(200).json(payload);
}

module.exports = {
  handleMethod,
  sendJson
};
