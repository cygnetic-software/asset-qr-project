const express = require("express");
const data = require("../data/faraz.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(data);
});
router.get("/:code", (req, res) => {
  const code = req.params.code;
  if (!code) {
    return res.status(400).json({
      error: "Code cannot be empty.",
    });
  }
  let studentData = data[code];
  res.status(200).send(studentData);
});

module.exports = router;
