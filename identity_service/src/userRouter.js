const express = require("express");
const app = express();
const sha256 = require("js-sha256");
const multer = require("multer");
const nodemailer = require("nodemailer");
const userModel = require("./models/userModel");
// const tokenModel = require("./models/tokenModel");

// Get all users in the database
app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user by email
app.get("/oneuser/:email", async (req, res) => {
  console.log(req.params.email);
  const user = await userModel.findOne({ email: req.params.email });

  try {
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log("Cannot find this user");
    res.status(500).send(error);
  }
});

// Create a new user
app.post("/user", async (req, res) => {
  // Look up if the user already exists
  userModel.countDocuments(
    { email: req.body.email },
    async function (err, count) {
      if (count > 0) {
        console.log("User already exists");
        res.status(400).send("User already exists");
      } else {
        const user = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: sha256.hex(req.body.password),
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
  let query = { email: req.body.email };

  userModel.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      email: req.body.email,
      password: sha256.hex(req.body.password),
    },
    { upsert: false },
    (err, doc) => {
      if (err) return res.status(500).send(err);
      res.send(doc); // returns null if doesnt exist such a user
    }
  );
});

// delete the doc by querying the email
app.delete("/user", async (req, res) => {
  var query = { email: req.body.email };

  userModel.findOneAndRemove(query, (err) => {
    if (err) return res.send(500, { error: err });
    console.log("User deleted");
    res.send("Succesfully deleted.");
  });
});

// return the user detail if the look-up is successful
app.post("/login", async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: sha256.hex(req.body.password),
  });

  try {
    console.log(user);
    res.send(user); // user === '' if no user is found
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload profile picture

// Specifying the storage location
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// Specifying the required file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Incorrect Image File Type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Find the tuple by email, update the image field,
// and send the stored image route as res
app.patch("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file);
  let query = { email: req.body.email };
  userModel.findOneAndUpdate(
    query,
    {
      image: req.file.path,
    },
    { upsert: false },
    (err) => {
      if (err) return res.status(500).send(err);
      console.log("User image stored");
      res.send("http://localhost:8001/" + req.file.path);
    }
  );
});

// Send a url to the user's email to reset the password
app.post("/forgetpassword", async (req, res) => {
  // can mute this function during testing
  userModel.countDocuments(
    { email: req.body.email },
    async function (err, count) {
      if (count > 0) {
        console.log("Found the user in the database");
      } else {
        console.log("User not found");
        return res.status(400).send("User not found");
      }
    }
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "booklab3900@gmail.com",
      pass: "Beltd3900",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const token = 123; // change this
  const link = `http://localhost:3000/forget-password/${req.body.email}/${token}`;

  const msg = {
    from: "booklab3900@gmail.com",
    to: req.body.email,
    subject: "Forget your email? - Booklab",
    text: "Sup, this Booklab.",
    html: `<p>You requested for reset your password, </p><p>Click the link below to reset your password</p><p>${link}</p>`,
  };

  await transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Email sent: " + info.messageId);
      res.sendStatus(200);
    }
  });
});

const genToken = () => {};

module.exports = app;
