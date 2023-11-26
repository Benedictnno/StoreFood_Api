const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./Routes/auth");
const storedFoodRouter = require("./Routes/storedFood");
const connectDB = require("./db/connection");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();
const Port = process.env.PORT || 5000;

app.use(express.json());

// Set up CORS with specific allowed origins
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authMiddleware, storedFoodRouter);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

// security packages
const helmet = require("helmet");
const xss = require("xss-clean");

app.use(helmet());
app.use(xss());

function start() {
  connectDB(process.env.MONGODB_URI);
  app.listen(Port, () => {
    console.log(`${Port} is active`);
  });
}

start();
