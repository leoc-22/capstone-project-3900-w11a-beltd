const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookid: { type: mongoose.Schema.Types.ObjectId, required: true },
    read: { type: Boolean, required: true },
    userCollection: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { collection: "UserBooks" }
);

const Books = mongoose.model("UserBooks", bookSchema);

module.exports = Books;
