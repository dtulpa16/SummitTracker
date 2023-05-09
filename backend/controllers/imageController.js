const { Photo } = require("../models/summit");

async function getAllImages() {
  let response = await Photo.find({});
  return response;
}

async function getImagesById(id) {
  let response = await Photo.findById({ _id: id });
  return response;
}

async function createImage(hikeId, imageUrl) {
  const response = new Photo({
    imageUrl: imageUrl,
    hike: hikeId,
  });
  await response.save();
  return response;
}

module.exports = {
  getAllImages,
  getImagesById,
  createImage,
};
