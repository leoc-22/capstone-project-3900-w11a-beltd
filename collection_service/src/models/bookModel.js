const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: String, required: true },
    publisher: { type: String, required: true },
    rating: { type: String },
    link: { type: String, required: true },
    asin: { type: String, required: true },
    price: { type: String, required: true },
    categories: [{ type: Object, required: true }],
    
    bookid: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { collection: "Books" }
);

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
