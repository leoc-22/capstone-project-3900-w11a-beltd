const express = require("express");
const userModel = require("./models/userModel");
const app = express();
const crypto = require("crypto");

const secret = "This is a company secret";
const Hasher = crypto.createHmac("sha256", secret);

app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/user", async (req, res) => {
  const hash = Hasher.update(req.body.password);

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hash.digest("hex"),
  });

  try {
    await user.save();
    console.log("User saved");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update password or name by querying the email
app.patch("/user", async (req, res) => {
  var query = { email: req.body.email };

  const hash = Hasher.update(req.body.password);

  userModel.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      email: req.body.email,
      password: hash.digest("hex"),
    },
    { upsert: true },
    (err, doc) => {
      if (err) return res.send(500, { error: err });
      console.log("User updated");
      res.send("Succesfully updated.");
    }
  );
});

// delete the doc by querying the email
app.delete("/user", async (req, res) => {
  var query = { email: req.body.email };

  userModel.findOneAndRemove(query, (err, doc) => {
    if (err) return res.send(500, { error: err });
    console.log("User deleted");
    res.send("Succesfully deleted.");
  });
});

module.exports = app;
