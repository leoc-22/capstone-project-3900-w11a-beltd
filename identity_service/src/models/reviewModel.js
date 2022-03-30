const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    review: { type: String, required: true },
  },
  { collection: "Reviews" }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
