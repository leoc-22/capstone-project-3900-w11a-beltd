const express = require("express");
const bookModel = require("./models/bookModel");
const app = express();
const axios = require("axios");

let counter = 0;

// Get all books in the database
app.get("/books", async (req, res) => {
  await bookModel
    .find({})
    .then((books) => {
      console.log(`Retrieved ${books.length} books`);
      res.send(books);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/books/autocomplete", async (req, res) => {
  await bookModel
    .find({})
    .select("title authors bookid categories")
    .then((books) => {
      console.log(`Retrieved ${books.length} books`);
      res.send(books);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/books/search/:q", async (req, res) => {
  let query = req.params.q;
  query = query.replaceAll("(", "\\(");
  query = query.replaceAll(")", "\\)");
  query = query.replaceAll("[", "\\[");
  query = query.replaceAll("]", "\\]");
  query = query.replaceAll("{", "\\{");
  query = query.replaceAll("}", "\\}");
  query = query.replaceAll("+", "\\+");
  query = query.replaceAll("*", "\\*");
  query = query.replaceAll("?", "\\?");

  console.log(query);

  await bookModel
    .find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { authors: { $regex: query, $options: "i" } },
        {
          categories: {
            $elemMatch: { name: { $regex: query, $options: "i" } },
          },
        },
      ],
    })
    .then((books) => {
      console.log(`Found ${books.length} books that match the query`);
      res.send(books);
    });
});

app.get("/similar/:categoryID", async (req, res) => {
  console.log(req.params.categoryID);
  await bookModel
    .find({
      categories: { $elemMatch: { id: { $eq: req.params.categoryID } } },
    })
    .then((books) => {
      console.log(`Retrieved ${books.length} books with the target category`);
      res.send(books);
    })
    .catch((error) => {
      console.log("category not found");
      res.status(500).send(error);
    });
});

app.get("/similar", async (req, res) => {
  console.log(req.query.author);
  let query = req.query.author;

  await bookModel
    .find({
      authors: { $regex: query, $options: "i" },
    })
    .then((books) => {
      console.log(`Retrieved ${books.length} books with the target author`);
      res.send(books);
    })
    .catch((error) => {
      console.log("author not found");
      res.status(500).send(error);
    });
});

// WARNING: Calling this API will use Rainforest API for multiple times,
// which costs api usage in the account
// Get books from 4 categories from Rainforest API and store them in the database
// Category API overview: https://www.rainforestapi.com/docs/categories-api/overview
app.get("/updatebookdb1", async () => {
  const params = {
    api_key: "6BE45BB0BE0F4BCA8DD46F0EC1B10B78",
    type: "category",
    category_id: "9",
    amazon_domain: "amazon.com",
    output: "json",
    include_html: "false",
  };

  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((res) => {
      console.log("retrieved data");
      res.data.category_results.map((e) => {
        // console.log(JSON.stringify(e));
        const book = new bookModel({
          title: e.title,
          image: e.image,
          authors: e.authors[0].name,
          rating: e.rating,
          link: e.link,
          asin: e.asin,
          bookid: counter,
          categories: e.categories,
        });
        book.save();
        counter++;
        console.log("A book is created");
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/updatebookdb2", async () => {
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
        // console.log(JSON.stringify(e));
        const book = new bookModel({
          title: e.title,
          image: e.image,
          authors: e.authors[0].name,
          rating: e.rating,
          link: e.link,
          asin: e.asin,
          bookid: counter,
          categories: e.categories,
        });
        book.save();
        counter++;
        console.log("A book is created");
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/updatebookdb3", async () => {
  const params = {
    api_key: "6BE45BB0BE0F4BCA8DD46F0EC1B10B78",
    type: "category",
    category_id: "5",
    amazon_domain: "amazon.com",
    output: "json",
    include_html: "false",
  };

  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((res) => {
      console.log("retrieved data");
      res.data.category_results.map((e) => {
        // console.log(JSON.stringify(e));
        const book = new bookModel({
          title: e.title,
          image: e.image,
          authors: e.authors[0].name,
          rating: e.rating,
          link: e.link,
          asin: e.asin,
          bookid: counter,
          categories: e.categories,
        });
        book.save();
        counter++;
        console.log("A book is created");
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/updatebookdb4", async () => {
  const params = {
    api_key: "6BE45BB0BE0F4BCA8DD46F0EC1B10B78",
    type: "category",
    category_id: "25",
    amazon_domain: "amazon.com",
    output: "json",
    include_html: "false",
  };

  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((res) => {
      console.log("retrieved data");
      res.data.category_results.map((e) => {
        // console.log(JSON.stringify(e));
        const book = new bookModel({
          title: e.title,
          image: e.image,
          authors: e.authors[0].name,
          rating: e.rating,
          link: e.link,
          asin: e.asin,
          bookid: counter,
          categories: e.categories,
        });
        book.save();
        counter++;
        console.log("A book is created");
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = app;
