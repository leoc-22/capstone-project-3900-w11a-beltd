const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "UserBooks" },
    title: { type: String, required: true },
    review: { type: String, required: true },
  },
  { collection: "Reviews" }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
