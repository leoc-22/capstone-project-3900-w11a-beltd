const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // 1. check if this coorect later
      //startDate: { type: Date, require: true },
      endDate: { type: Date, default: Date.now, require: true },
      target: { type: Number, require: true },
      current: { type: Number },
      completed: {type: Boolean, require: true},
  
    }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;