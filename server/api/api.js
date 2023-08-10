const express = require("express");
const assetRouter = require("../routes/asset.route");

const router = express.Router();

router.use("/assets", assetRouter);

module.exports = router;
