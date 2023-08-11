require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRouter = require("./api/api");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;

const app = express();
const router = express.Router();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

router.use("/api", apiRouter);

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server started");
});
