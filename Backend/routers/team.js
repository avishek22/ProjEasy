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

router.post("/newteam", Loginlead, (req, res) => {
  const { teamname } = req.body;
  if (teamname == "") {
    return res.status(422).json({ error: "Please add  the Team Name!" });
  }

  console.log(req.lead);

  const team = new Team({
    teamname,
  });
  team
    .save()
    .then((result) => {
      result;
      res.json({ team: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/addmembers", Loginlead, (req, res) => {
  console.log(req.admin);
  if (req.body.memberid === "") {
    res.status(422).json({ error: "Add member!" });
  }
  Team.findByIdAndUpdate(req.body.teamid, {
    $push: { members: req.body.memberid },
  })
    .populate("members")
    .then((result) => {
      res.json({ team: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/removeteammember", Loginlead, (req, res) => {
  console.log(req.admin);

  Team.findByIdAndUpdate(req.body.teamid, {
    $pull: { members: req.body._id },
  })
    .populate("members")
    .then((result) => {
      res.json({ team: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/editteamname", Loginlead, (req, res) => {
  console.log(req.lead);
  if (req.body.teamname === "" || req.body.teamid === "") {
    res.status(422).json({ error: "Enter the name!" });
  }
  Team.findByIdAndUpdate(req.body.teamid, {
    $set: { teamname: req.body.teamname },
  })
    .populate("members")
    .then((result) => {
      res.json({ team: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deleteteam", Loginlead, (req, res) => {
  console.log(req.body.teamid);
  Team.findOne({ _id: req.body.teamid })
    .populate("members")
    .exec((err, team) => {
      if (err || !team) {
        return res.status(422).json({ error: err });
      }

      team
        .remove()
        .then((result) => {
          res.json(result);
        })
        .catch((e) => {
          console.log(e);
        });
    });
});

router.get("/allteam", Loginlead, (req, res) => {
  Team.find()

    .populate("members")

    .sort("-createdAt")
    .then((team) => {
      res.json({ team });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/adminallteam", Loginadmin, (req, res) => {
  Team.find()

    .populate("members")

    .sort("-createdAt")
    .then((team) => {
      res.json({ team });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/particularteam", Loginlead, (req, res) => {
  Team.find({ _id: req.body.teamid })

    .populate("members")
    .select("members")

    .then((team) => {
      res.json({ team });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/adminparticularteam", Loginadmin, (req, res) => {
  Team.find({ _id: req.body.teamid })

    .populate("members")
    .select("members")

    .then((team) => {
      res.json({ team });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allresource", Loginadmin, (req, res) => {
  Resource.find()

    .then((resource) => {
      res.json({ resource });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
