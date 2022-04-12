const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookid: { type: Number, required: true },
    read: { type: Boolean, required: true },
    reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Reviews"},
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collections" }],
  },
  { collection: "UserBooks" }
);

const Books = mongoose.model("UserBooks", bookSchema);

module.exports = Books;
