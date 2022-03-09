const express = require("express");
const userModel = require("./models/userModel");
const app = express();
const crypto = require("crypto");

const secret = "This is a company secret";
const Hasher = crypto.createHmac("sha256", secret);

// Get all users in the database
app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/user", async (req, res) => {
  // Look up if the user already exists
  userModel.countDocuments(
    { email: req.body.email },
    async function (err, count) {
      if (count > 0) {
        //document exists
        console.log("User already exists");
        res.status(400).send("User already exists");
      } else {
        const hash = Hasher.update(req.body.password);
        const user = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: hash.digest("hex"),
        });

        try {
          await user.save();
          res.send(user);
          console.log("User created");
        } catch (error) {
          res.status(500).send(error);
        }
      }
    }
  );
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
      if (err) return res.status(500).send(err);
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

// return the user detail if the look-up is successful
app.get("/login", async (req, res) => {
  const hash = Hasher.update(req.body.password);
  const user = await userModel.findOne({
    email: req.body.email,
    password: hash.digest("hex"),
  });

  try {
    console.log("Found user");
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
