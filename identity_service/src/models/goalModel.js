const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    endDate: { type: String, default: Date.now, require: false }, // REMOVE FALSE
    target: { type: Number, require: true },
    current: { type: Number },
    completed: {type: Boolean, require: true },
  },
  { collection: "Goals" }
);

const Goals = mongoose.model("Goals", goalSchema);

module.exports = Goals;
