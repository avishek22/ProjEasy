const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Admin = require("../models/admin");

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
    Admin.findById(_id).then((adminData) => {
      req.admin = adminData;
      next();
    });
  });
};
