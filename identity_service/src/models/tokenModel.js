const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 3600,
    },
  },
  { collection: "Tokens" }
);

module.exports = mongoose.model("Tokens", tokenSchema);
