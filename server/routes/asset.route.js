const express = require("express");
const upload = require("../settings/multer.config"); // Import the multer instance

const router = express.Router();
const File = require("../model/File.model"); // Update the path based on your folder structure
const QRCode = require("qrcode");

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const filepath = `uploads/${req.file.filename}`;

  try {
    const newFile = new File({
      url: filepath,
      qrCodeLink: "", // Temporary, we'll update this
    });

    await newFile.save();

    const frontendURL = process.env.FRONTEND_LINK;
    const qrCodeLink = await QRCode.toDataURL(frontendURL + newFile._id);

    newFile.qrCodeLink = qrCodeLink;
    await newFile.save();
    res.status(200).json({ qrCodeLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error saving to database or generating QR code.",
      actualErr: error,
    });
  }
});
router.get("/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found.");
    }
    res.json(file);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching file.");
  }
});

module.exports = router;
