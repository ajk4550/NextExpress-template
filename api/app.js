require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const users = require("./routes/users");
const auth = require("./middleware/auth");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", users);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
