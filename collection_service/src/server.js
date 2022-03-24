const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./userRouter.js");
const bookRouter = require("./bookRouter.js");
const port = 8002;
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
