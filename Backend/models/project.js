const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Leader: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Lead",
    },
    Status: {
      type: String,
      default: "On Progress",
    },
    Subtask: [{ type: mongoose.Schema.Types.ObjectID, ref: "Subtask" }],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
