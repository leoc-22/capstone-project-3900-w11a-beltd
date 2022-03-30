const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./bookRouter.js");
const port = 8002;
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const name = "collection-service";
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

app.use(bookRouter);

// Drop the entire database, development only, use for testing
app.delete("/drop", async (req, res) => {
  try {
    await mongoose.connection.dropCollection("Books");
    console.log("Collection dropped");
  } catch {
    res.status(500).send("Error deleting database");
  }
});

app.listen(port, () => {
  console.log(`Collection Service listening on port: ${port}`);
});
