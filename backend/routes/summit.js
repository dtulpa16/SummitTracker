const express = require("express");
const router = express.Router();
const validateHike = require("../middleware/middleware");
const {
  getAllHikes,
  getHikeById,
  updateHikeById,
  createHike,
  deleteHikeById,
} = require("../controllers/hikeControllers.js");

router.get("/", async (req, res) => {
  let results = await getAllHikes();
  console.log(results);
  return res.status(200).send(results);
});

router.get("/:id", async (req, res) => {
  let result = await getHikeById(req.params.id);
  console.log(result);
  return res.status(200).send(result);
});

router.post("/",[validateHike], async (req, res) => {
  try {
    let result = await createHike(req.body);
    console.log(result);
    return res.status(201).send(result);
  } catch (er) {
    return res.status(500).send(er);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let result = await updateHikeById(req.params.id, req.body);
    console.log(result);
    return res.status(201).send(result);
  } catch (er) {
    return res.status(500).send(er);
  }
});

router.delete("/:id", async (req, res) => {
  let result = await deleteHikeById(req.params.id);
  console.log(result);
  return res.status(204).send(result);
});

module.exports = router;
