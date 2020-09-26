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

const Loginresource = require("../middleware/Loginresource");

router.put("/newsubtask", Loginlead, (req, res) => {
  const stask = {
    title: req.body.title,
    team: req.body.teamid,
  };
  console.log(req.body.title);
  console.log(req.body.teamid);
  if (req.body.title === "" || req.body.teamid == "") {
    return res.status(422).json({ error: "Enter all fields!" });
  }
  Project.findByIdAndUpdate(
    req.body.projectid,
    {
      $push: { Subtask: stask },
    },
    { new: true }
  )
    .populate("Subtask.team")

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.get("/myteams", Loginresource, (req, res) => {
  console.log(req.resource);

  Team.find({ members: req.resource })
    // .populate("Subtask._id")
    .then((result) => {
      res.json({ teams: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/mysubtask", Loginresource, (req, res) => {
  console.log(req.resource);

  Project.find({ "Subtask.team": req.body.myteam })
    .populate("Subtask.team")
    .select("Subtask ")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

// router.post("/allsubtask", Loginlead, (req, res) => {
//   Project.findById(req.body.projectid)

//     .populate("Subtask.team")
//     .select("Subtask")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

router.get("/allsubtask", Loginlead, (req, res) => {
  console.log(req.lead);

  Project.findById({ _id: req.body.projectid })
    .populate("Subtask._id")
    .then((result) => {
      res.json({ project: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/allsubtask", Loginlead, (req, res) => {
  Project.findById(req.body.projectid)

    .populate("Subtask.team")
    .select("Subtask")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
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
