const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const isProduction = process.env.NODE_ENV === "production";
const port = isProduction ? 8000 : 8001;
const uri =
  "mongodb+srv://w11a-beltd:comp3900-w11a-beltd@cluster0.3myyc.mongodb.net/Cluster0?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

client.connect((err) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
  const collection = client.db("test").collection("testCollection");

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Identity Service");
  });

  app.post("/users", (req, res) => {
    var newUser = new User(req.body);

    collection
      .insertOne(newUser)
      .then((result) => {
        res.json(`User ${newUser.name} added`);
        console.log(`User ${newUser.name} added`);
        console.log(`Email is ${newUser.email}`);
      })
      .catch((error) => console.error(error));
  });

  app.put("/users", (req, res) => {
    collection
      .findOneAndUpdate(
        {
          name: req.body.email,
          email: req.body.email,
        },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          },
        }
      )
      .then((result) => res.json("Success"))
      .catch((error) => console.error(error));
  });

  app.delete("/users", (req, res) => {
    collection
      .deleteOne({
        name: req.body.name,
        email: req.body.email,
      })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.json("No user to delete");
        }
        res.json(`User ${req.body.name} deleted`);
        console.log(`User ${req.body.name} deleted`);
      })
      .catch((error) => console.error(error));
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
