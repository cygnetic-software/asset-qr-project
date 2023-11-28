const express = require("express");
const assetRouter = require("../routes/asset.route");
const dataRouter = require("../routes/data.route");
const router = express.Router();

router.use("/assets", assetRouter);
router.use("/users", dataRouter);

module.exports = router;
