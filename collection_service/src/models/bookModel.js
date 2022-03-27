const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: String, required: true },
    rating: { type: String },
    link: { type: String, required: true },
    asin: { type: String, required: true },
    // prices in the future
  },
  { collection: "Books" }
);

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
