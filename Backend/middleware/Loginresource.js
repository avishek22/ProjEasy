const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Resource = require("../models/resource");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "You must be logged in!" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in!" });
    }
    const { _id } = payload;
    Resource.findById(_id).then((resourceData) => {
      req.resource = resourceData;
      next();
    });
  });
};
