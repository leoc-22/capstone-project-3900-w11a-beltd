const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./userRouter.js");

const isProduction = process.env.NODE_ENV === "production";
const port = isProduction ? 8000 : 8001;
const app = express();

app.use(express.json());

const connectionStr =
  "mongodb+srv://w11a-beltd:comp3900-w11a-beltd@cluster0.3myyc.mongodb.net/Cluster0?retryWrites=true&w=majority";
try {
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch {
  console.log("Error connecting to database");
}

app.use(userRouter);

app.listen(port, () => {
  console.log(`Identity Service listening on port: ${port}`);
});
