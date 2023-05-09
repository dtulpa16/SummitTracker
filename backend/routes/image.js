const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllImages,
  getImagesById,
  createImage,
  deleteImageById
} = require("../controllers/imageController");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "public", "uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.post("/:id/upload", upload.single("imageUrl"), async (req, res) => {
  try {
    const hikeId = req.params.id;
    const imageUrl = `/uploads/${req.file.filename}`;
    let response = await createImage(hikeId, imageUrl);

    res.status(201).send({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    let response = await getAllImages();
    return res.status(200).send(response);
  } catch (er) {
    return res.status(500).send(er);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let response = await getImagesById(req.params.id);
    return res.status(200).send(response);
  } catch (er) {
    return res.status(500).send(er);
  }
});

router.put("/update-image/:id", async (req, res) => {
  return;
});

router.delete("/delete-image/:id", async (req, res) => {
  try {
    let response = await deleteImageById(req.params.id);
    return res.status(200).send(response);
  } catch (er) {
    return res.status(500).send(er);
  }
});

module.exports = router;
