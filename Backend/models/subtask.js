const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    subtask: {
      type: String,
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectID, ref: "Team" },
  },
  { timestamps: true }
);

const Subtask = mongoose.model("Subtask", subtaskSchema);
module.exports = Subtask;
