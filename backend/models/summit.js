const mongoose = require("mongoose");
const Joi = require("joi");

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const photoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  hike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hike",
    required: true,
  },
});

const hikeSchema = mongoose.Schema({
  name: { type: String, minLength: 5, required: true },
  coordinates: {
    type: String,
    minLength: 5,
    default: "40.398857, -105.052643",
  },
  altitude: { type: Number, default: 0 },
  length: { type: mongoose.Decimal128 },
  date: { type: Date, default: Date.now },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      null: true,
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);
const Hike = mongoose.model("Hike", hikeSchema);
const Note = mongoose.model("Note", noteSchema);

module.exports = { Hike, Photo, Note };
