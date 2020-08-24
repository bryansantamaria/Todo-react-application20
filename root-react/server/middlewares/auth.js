const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(403);
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.sendStatus(403).json(error);
  }
};

module.exports = { authenticate };
