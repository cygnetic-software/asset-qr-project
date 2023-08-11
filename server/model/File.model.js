const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  qrCodeLink: String,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
