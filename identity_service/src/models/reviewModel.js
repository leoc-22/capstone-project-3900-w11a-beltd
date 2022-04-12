const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
    title: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5},
  },
  { collection: "Reviews" }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
