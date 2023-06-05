const { Hike, Note } = require("../models/summit");
async function getAllHikes() {
  let response = await Hike.find({}).populate("notes");
  return response;
}

async function getHikeById(id) {
  let response = await Hike.findById(id).populate("notes");
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
  let response = await Hike.findByIdAndDelete({ _id: id });
  return response;
}

async function addNote(id, data) {
  const hike = await Hike.findById({ _id: id });

  const note = new Note(data);
  await note.save();

  hike.notes.push(note._id);
  await hike.save();
}

async function getTotalAltitude() {
  let response = await Hike.find({});
  return response;
}

async function fetchNotes(req) {
  const hikeId = req.params.id;
  const hike = await Hike.findById(hikeId).populate("notes");
  return hike.notes;
}

module.exports = {
  getAllHikes,
  getHikeById,
  updateHikeById,
  createHike,
  deleteHikeById,
  addNote,
  fetchNotes,
  getTotalAltitude,
};
