const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Lead = require("../models/lead");
const Resource = require("../models/resource");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Loginadmin = require("../middleware/Loginadmin");
const loginlead = require("../middleware/Loginlead");
const loginresource = require("../middleware/Loginresource");

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

router.post("/signuplead", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }

  Lead.findOne({ email: email })
    .then((savedLead) => {
      if (savedLead) {
        return res.status(422).json({ error: "Email already exists!" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const lead = new Lead({
          email,
          password: hashedPassword,
          name,
        });
        lead
          .save()
          .then((lead) => {
            res.json({ message: "Account Signed In!", lead });
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

router.post("/signupresource", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields!" });
  }

  Resource.findOne({ email: email })
    .then((savedResource) => {
      if (savedResource) {
        return res.status(422).json({ error: "Email already exists!" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const resource = new Resource({
          email,
          password: hashedPassword,
          name,
        });
        resource
          .save()
          .then((resource) => {
            res.json({ message: "Account Signed In!", resource });
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

router.post("/loginlead", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Enter all fileds!" });
  }
  Lead.findOne({ email: email })
    .then((savedLead) => {
      if (!savedLead) {
        return res.status(422).json({ error: "Invalid credentials!" });
      }
      bcrypt
        .compare(password, savedLead.password)
        .then((match) => {
          if (match) {
            // res.send("Logged In");
            const token = jwt.sign({ _id: savedLead._id }, JWT_SECRET);
            const { _id, email, name } = savedLead;
            res.json({
              token,
              Lead: { _id, email, name },
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

router.post("/loginresource", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Enter all fileds!" });
  }
  Resource.findOne({ email: email })
    .then((savedResource) => {
      if (!savedResource) {
        return res.status(422).json({ error: "Invalid credentials!" });
      }
      bcrypt
        .compare(password, savedResource.password)
        .then((match) => {
          if (match) {
            // res.send("Logged In");
            const token = jwt.sign({ _id: savedResource._id }, JWT_SECRET);
            const { _id, email, name } = savedResource;
            res.json({
              token,
              Resource: { _id, email, name },
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
