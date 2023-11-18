const express = require("express");
const app = express();
const authRouter = require("./Routes/auth");
const storedFoodRouter = require("./Routes/storedFood");
const connectDB = require("./db/connection");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();
const Port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authMiddleware, storedFoodRouter);
app.use(express.urlencoded({ extended: true }));

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
app.use(helmet());
app.use(cors());
app.use(xss());
function start() {
  connectDB(process.env.MONGODB_URI);
  app.listen(Port, () => {
    console.log(`${Port} is active`);
  });
}

start();
