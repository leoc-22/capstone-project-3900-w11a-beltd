const express = require("express");
const bookModel = require("./models/bookModel");
const app = express();
const axios = require("axios");

// Get all books in the database
app.get("/books", async (req, res) => {
  const books = await bookModel.find({});

  try {
    console.log(`Retrieved ${books.length} books`);
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// WARNING: Calling this API will use Rainforest API for 23 times
// Get all books from Rainforest API and store them in the database
// Category API overview: https://www.rainforestapi.com/docs/categories-api/overview
app.get("/updatebookdb", async () => {
  const params = {
    api_key: "6BE45BB0BE0F4BCA8DD46F0EC1B10B78",
    type: "category",
    category_id: "48",
    amazon_domain: "amazon.com",
    output: "json",
    include_html: "false",
  };

  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((res) => {
      console.log("retrieved data");
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

module.exports = app;
