const express = require("express");
const bookModel = require("./models/bookModel");
const app = express();
const axios = require("axios");
const EbayAuthToken = require("ebay-oauth-nodejs-client");

let token = null;

const ebayAuthToken = new EbayAuthToken({
  filePath: "secrets.json",
});

const clientScope = "https://api.ebay.com/oauth/api_scope";

ebayAuthToken
  .getApplicationToken("PRODUCTION", clientScope)
  .then((data) => {
    token = JSON.parse(data).access_token;
  })
  .catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
  });

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

app.get("/book/:id", async (req, res) => {
  await bookModel
    .findById(req.params.id)
    .then((book) => {
      console.log(`Retrieved ${book.title}`);
      res.send(book);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Provide a list of book titles, authors, and genres for the autocomplete feature in the client
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

// Search for a book by its title, author, or genre
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
  query = query.replaceAll(".", "\\.");

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

// Get similar books by its genre (category)
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

// Get books by author
app.get("/getbooksbyauthor", async (req, res) => {
  console.log(`author: ${req.query.author}`);
  let query = req.query.author;

  query = query.replaceAll("(", "\\(");
  query = query.replaceAll(")", "\\)");
  query = query.replaceAll("[", "\\[");
  query = query.replaceAll("]", "\\]");
  query = query.replaceAll("{", "\\{");
  query = query.replaceAll("}", "\\}");
  query = query.replaceAll("+", "\\+");
  query = query.replaceAll("*", "\\*");
  query = query.replaceAll("?", "\\?");
  query = query.replaceAll(".", "\\.");

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

app.get("/books/:rating", async (req, res) => {
  await bookModel
    .find({ rating: { $gte: req.params.rating } })
    .then((books) => {
      console.log(
        `Retrieved ${books.length} books with rating >= ${req.params.rating}`
      );
      res.send(books);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/ebay/:title", async (req, res) => {
  await axios({
    method: "get",
    url: `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${req.params.title}&limit=1`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_AU",
      "X-EBAY-C-ENDUSERCTX":
        "affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>",
    },
  })
    .then((result) => {
      console.log(result.data);
      res.send({
        value: result.data.itemSummaries[0].price.value,
        link: result.data.itemSummaries[0].itemWebUrl,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// WARNING: Calling this API will use Rainforest API for multiple times,
// which costs api usage in the account
// Get books from 4 categories from Rainforest API and store them in the database
// Category API overview: https://www.rainforestapi.com/docs/categories-api/overview
let counter = 0;

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
          price: {
            value: e.price.value,
            currency: e.price.currency,
            link: e.price.link,
          },
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
          price: {
            value: e.price.value,
            currency: e.price.currency,
            link: e.price.link,
          },
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
          price: {
            value: e.price.value,
            currency: e.price.currency,
            link: e.price.link,
          },
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
          price: {
            value: e.price.value,
            currency: e.price.currency,
            link: e.price.link,
          },
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
