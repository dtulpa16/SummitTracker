const { Hike } = require("../models/summit");
async function getAllHikes() {
  let response = await Hike.find({});
  return response;
}

async function getHikeById(id) {
  let response = await Hike.findById({ _id: id });
  return response;
}

async function updateHikeById(id, data) {
  let response = await Hike.findByIdAndUpdate(id, data, { new: true });
  return response;
}

async function createHike(body) {
  let response = new Hike(body);
  await response.save();
  return response;
}

async function deleteHikeById(id) {
  let response = await Hike.findByIdAndDelete({_id:id})
  return response
}
module.exports = {
  getAllHikes,
  getHikeById,
  updateHikeById,
  createHike,
  deleteHikeById,
};
