require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();

// cors
const cors = require("cors");

// Router
const dataRouter = require("./routes/dataRoute");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/data", dataRouter);

app.get("*", (req, res) => {
  res.send("Route does not exits");
});

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

// module.exports = app;
