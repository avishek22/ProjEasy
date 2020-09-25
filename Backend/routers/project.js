const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Lead = require("../models/lead");
const Resource = require("../models/resource");
const Project = require("../models/project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const Loginadmin = require("../middleware/Loginadmin");
const loginlead = require("../middleware/Loginlead");
const loginresource = require("../middleware/Loginresource");

router.post("/newproject", Loginadmin, (req, res) => {
  const { Title, Leader } = req.body;
  if (Title === "" || Leader === "") {
    return res.status(422).json({ error: "Please add all the fields!" });
  }

  console.log(req.admin);

  const project = new Project({
    Title,
    Leader,
  });
  project
    .save()
    .then((result) => {
      result;
      res.json({ project: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/editproject", Loginadmin, (req, res) => {
  // const { Title, Leader } = req.body;
  // if (!Title || !Leader) {
  //   return res.status(422).json({ error: "Please add all the fields!" });
  // }

  console.log(req.admin);

  Project.findByIdAndUpdate(req.body.projectid, {
    $set: { Title: req.body.Title },
  })
    .populate("Leader")
    .then((result) => {
      res.json({ project: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deleteproject", Loginadmin, (req, res) => {
  Project.findOne({ _id: req.body.projectid })
    .populate("Leader")
    .exec((err, project) => {
      if (err || !project) {
        return res.status(422).json({ error: err });
      }

      project
        .remove()
        .then((result) => {
          res.json(result);
        })
        .catch((e) => {
          console.log(e);
        });
    });
});

router.get("/allproject", Loginadmin, (req, res) => {
  Project.find()

    .populate("Leader")

    .sort("-createdAt")
    .then((project) => {
      // if (project.length === 0) {
      //   res.json({ posts: "No projects" });
      // } else {
      res.json({ project });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/alllead", Loginadmin, (req, res) => {
  Lead.find()

    .then((lead) => {
      // if (project.length === 0) {
      //   res.json({ posts: "No projects" });
      // } else {
      res.json({ lead });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
