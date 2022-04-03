const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collections" }],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { collection: "Users" }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
