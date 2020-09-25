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

const loginresource = require("../middleware/Loginresource");
const Loginlead = require("../middleware/Loginlead");
const Team = require("../models/team");
const Subtask = require("../models/subtask");

router.post("/newsubtask", Loginlead, (req, res) => {
  const { subtask, team } = req.body;
  if (team == "" || subtask == "") {
    return res.status(422).json({ error: "Please add  the fields!" });
  }

  console.log(req.lead);

  const subtask1 = new Subtask({
    subtask,
    team,
  });
  subtask1
    .save()
    .then((result) => {
      result;
      res.json({ subtask: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/addsubtask", Loginlead, (req, res) => {
  console.log(req.lead);

  Project.findByIdAndUpdate(req.body.projectid, {
    $push: { Subtask: req.body.subtaskid },
  })
    .populate("subtask")
    .then((result) => {
      res.json({ project: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allsubtask", Loginlead, (req, res) => {
  console.log(req.lead);

  Project.findById({ _id: req.body.projectid })
    .populate("team")
    .then((result) => {
      res.json({ project: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/showleadproject", Loginlead, (req, res) => {
  Project.find({ Leader: req.lead })

    .populate("Leader")

    .sort("-createdAt")
    .then((project) => {
      res.json({ project });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
