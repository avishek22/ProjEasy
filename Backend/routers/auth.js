const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Loginadmin = require("../middleware/Loginadmin");

router.post("/signupadmin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }

  Admin.findOne({ email: email })
    .then((savedAdmin) => {
      if (savedAdmin) {
        return res.status(422).json({ error: "Email already exists!" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const admin = new Admin({
          email,
          password: hashedPassword,
        });
        admin
          .save()
          .then((admin) => {
            res.json({ message: "Account Signed In!", admin });
          })
          .catch((e) => {
            res.send(e);
          });
      });
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/loginadmin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Enter all fileds!" });
  }
  Admin.findOne({ email: email })
    .then((savedAdmin) => {
      if (!savedAdmin) {
        return res.status(422).json({ error: "Invalid credentials!" });
      }
      bcrypt
        .compare(password, savedAdmin.password)
        .then((match) => {
          if (match) {
            // res.send("Logged In");
            const token = jwt.sign({ _id: savedAdmin._id }, JWT_SECRET);
            const { _id, email } = savedAdmin;
            res.json({
              token,
              admin: { _id, email },
            });
          } else {
            return res.status(422).json({ error: "Invalid password!" });
          }
        })
        .catch((e) => {
          res.send(e);
          console.log(e);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
