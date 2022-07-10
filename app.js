require("dotenv").config;
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const erroMiddler = require("./middleware/error-handler");

// app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use(notFoundMiddleware);
app.use(erroMiddler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONG0_URI);
    app.listen(port, console.log(`server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
