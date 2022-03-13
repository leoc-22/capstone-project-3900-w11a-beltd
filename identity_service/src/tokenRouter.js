const express = require("express");
const app = express();

const User = require("./models/userModel");
const Token = require("./models/tokenModel");
const sendEmail = require("./util/sendEmail");
const crypto = require("crypto");

const secret = "This is a company secret";
const Hasher = crypto.createHmac("sha256", secret);

//const app = require("./userRouter");
const bcrypt = require("bcrypt");
//const { modelName } = require("../../../../../../../../identity_service/src/models/userModel");

const token = null;

app.post("/forget", async (req, res) => {
  var query = { email: req.body.email };
  User.countDocuments({ email: req.body.email }, async function (err, count) {
    if (count > 0) {
      console.log("found email");
      await requestPasswordReset(query);
    } else {
      console.log("user not found");
    }
  });
});

app.put("/passwordReset?token:resetToken", async (req, res) => {
  if (resetToken == token) {
    updatePassword(email);
  }
});

// Updates password
const updatePassword = async (email) => {
  const hash = Hasher.update(req.body.password);
  User.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      email: req.body.email,
      password: hash.digest("hex"),
    },
    { upsert: true },
    (err, doc) => {
      if (err) return res.status(500).send(err);
      console.log("User updated");
      res.send("Succesfully updated.");
    }
  );
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne(email);

  //const clientURL = localhost;

  //if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  // const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
  const hash = Hasher.update(resetToken);

  await new Token({
    userId: user._id,
    token: hash.digest("hex"),
    createdAt: Date.now(),
  }).save();

  const link = `http://localhost:8001/passwordReset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./util/forgotPassword.handlebars"
  );
  return link;
};

module.exports = app;
