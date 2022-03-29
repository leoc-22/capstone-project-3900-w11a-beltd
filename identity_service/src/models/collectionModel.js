const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    public: { type: Boolean, require: true }, // for private/public
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserBooks" }],
  },
  { collection: "Collections" }
);

const Collections = mongoose.model("Collections", collectionSchema);

module.exports = Collections;
