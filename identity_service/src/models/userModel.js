const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  authors: { type: String, required: true },
  rating: { type: String },
  link: { type: String, required: true },
  asin: { type: String, required: true },
  // prices in the future
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    books: [bookSchema],
  },
  { collection: "Users" }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
