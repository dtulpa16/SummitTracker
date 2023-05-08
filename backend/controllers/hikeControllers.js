const { Hike } = require("../models/summit");
async function getAllHikes() {
  let response = await Hike.find({})
  return response
}

async function getHikeById(id) {
  return;
}

async function updateHikeById(id, data) {}

async function createHike(body) {
  let response = new Hike(body);
  await response.save();
  return response;
}

async function deleteHikeById(id) {}
module.exports = {
  getAllHikes,
  getHikeById,
  updateHikeById,
  createHike,
  deleteHikeById,
};
