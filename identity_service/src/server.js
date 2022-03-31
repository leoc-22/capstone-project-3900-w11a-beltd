const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./userRouter.js");
const bookRouter = require("./userBookRouter.js");
const goalRouter = require("./goalRouter.js");
const collectionRouter = require("./collectionRouter.js");
const reviewRouter = require("./reviewRouter");
const bodyParser = require("body-parser");

const port = 8001;
const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const name = "identity-service";
const connectionStr = `mongodb+srv://w11a-beltd:comp3900-w11a-beltd@cluster0.3myyc.mongodb.net/${name}?retryWrites=true&w=majority`;
try {
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch {
  console.log("Error connecting to database");
}

app.use(userRouter);
app.use(bookRouter);
app.use(goalRouter);
app.use(collectionRouter);
app.use(reviewRouter);

// Drop the entire database, development only, use only for testing
app.delete("/drop", async (req, res) => {
  try {
    await mongoose.connection.dropCollection("Users");
    console.log("Collection dropped");
  } catch {
    res.status(500).send("Error deleting database");
  }
});

app.listen(port, () => {
  console.log(`Identity Service listening on port: ${port}`);
});
