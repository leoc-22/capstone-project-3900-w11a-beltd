const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./userRouter.js");
const axios = require("axios");
const port = 8001;
const app = express();
const cors = require("cors");
const bookModel = require("./models/bookModel");

app.use(cors());

app.use(express.json());

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

// Drop the entire database, development only, use for testing
app.delete("/drop", async (req, res) => {
  try {
    await mongoose.connection.dropCollection("Users");
    console.log("Collection dropped");
  } catch {
    res.status(500).send("Error deleting database");
  }
});

// CALLING THIS API WILL USE RAINFOREST API FOR 23 TIMES
app.get("/updatebookdb", async () => {
  // const category_list = [
  //   1, 2, 3, 4, 5, 6, 48, 4366, 48, 8975347011, 173507, 9, 10, 86, 10777,
  //   301889, 18, 20, 21, 22, 23, 27, 75,
  // ];

  const params = {
    api_key: "6BE45BB0BE0F4BCA8DD46F0EC1B10B78",
    type: "category",
    category_id: "4366",
    amazon_domain: "amazon.com",
    output: "json",
    include_html: "false",
  };

  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((res) => {
      console.log("retrieved data");
      // console.log(JSON.stringify(response.data, 0, 2));
      res.data.category_results.map((e) => {
        const book = new bookModel({
          title: e.title,
          image: e.image,
          authors: e.authors[0].name,
          rating: e.rating,
          link: e.link,
          asin: e.asin,
        });
        book.save();
        console.log("A book is created");
      });
      return;
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Identity Service listening on port: ${port}`);
});
