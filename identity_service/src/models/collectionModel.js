const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: { type: String, require: true },
    public: { type: Boolean, require: true }, // for private/public
    books: [{ type: Number, ref: "UserBooks" }], // check reference not just object id, primary keys
  },
  { collection: "Collections" }
);

const Collections = mongoose.model("Collections", collectionSchema);

module.exports = Collections;
