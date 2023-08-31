const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require('sharp');
const {
  getAllImages,
  getImagesById,
  createImage,
  deleteImageById,
} = require("../controllers/imageController");
const AWS = require("aws-sdk")
require("dotenv").config();
const upload = multer({
  storage: multer.memoryStorage(),
});
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

router.post("/:id/upload", upload.single("imageUrl"), async (req, res) => {
  try {
    const file = req.file;
    const hikeId = req.params.id;
    const resizedImageBuffer = await sharp(file.buffer)
      .resize(900) 
      .jpeg({ quality: 85 })
      .toBuffer();

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: resizedImageBuffer,  
      ACL: 'public-read'
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        res.status(500).json({ error: "Error -> " + err });
      } else {
        console.log("Image Location: ",data.Location)
        createImage(hikeId, data.Location) // The data.Location value is the URL of the image in S3
          .then(() => {
            res.json({ imageUrl: data.Location });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Server error");
          });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  } 
});
// router.post("/:id/upload", upload.single("imageUrl"), async (req, res) => {
//   try {
//     const hikeId = req.params.id;
//     const imageUrl = `/uploads/${req.file.filename}`;
//     let response = await createImage(hikeId, imageUrl);

//     res.status(201).send({ imageUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });
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
