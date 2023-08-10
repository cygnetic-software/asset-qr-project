require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const http = require("http");

const apiRouter = require("./api/api");

const server = http.createServer();
const app = express(server);
const PORT = process.env.PORT;
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = upload;

app.use(cors());
app.use(express.json());
router.use("/api", apiRouter);

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server started");
});
