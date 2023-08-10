const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ Message: "The server is running..." });
});

module.exports = router;
