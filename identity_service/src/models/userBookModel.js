const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    link: { type: String, required: true },
    asin: { type: String, required: true },
    // prices in the future
    bookid: { type: Number, required: true },
    categories: [{ type: Object, required: true }],
    userRating: { type: Number, required: false },
    publisher: { type: String, required: true },
    date: { type: Date, required: true },
    read: { type: Boolean, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { collection: "UserBooks" }
);

const Books = mongoose.model("UserBooks", bookSchema);

module.exports = Books;
