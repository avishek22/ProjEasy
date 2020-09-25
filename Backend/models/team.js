const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamname: {
      type: String,
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectID, ref: "Resource" }],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
