require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();

const serverLess = require("serverless-http");

// cors
const cors = require("cors");

// Router
const dataRouter = require("./routes/dataRoute");

// middleware
const notFoundMiddleware = require("./middleware/not-found");

const route = express.Router();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow credentials like cookies, authorization headers, etc. (if needed)
  })
);
app.use(express.json());

app.use("/api/v1/data", dataRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// app.use("/.netlify/functions/api", route);

// module.exports.handler = serverLess(app);
start();
