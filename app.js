require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();

// cors
const cors = require("cors");

// Connection
const { connection } = require("./db/connect");

// Router
const dataRouter = require("./routes/dataRoute");

// middleware
const notFoundMiddleware = require("./middleware/not-found");

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

start();
