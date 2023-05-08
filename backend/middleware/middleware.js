function validateHike(req, res, next) {
    let hikeToValidate = req.body
    if (
      !hikeToValidate.name
    ) {
      return res
        .status(400)
        .send({ error: "Name is a required fields" });
    }
    
    if (hikeToValidate.length && typeof(hikeToValidate.length) !== "number") {
      return res.status(400).send({ error: "Length must be an integer" });
    }
    if (hikeToValidate.altitude && typeof(hikeToValidate.altitude) !== "number") {
      return res.status(400).send({ error: "Altitude must be an integer" });
    }
  
    next();
  }
  module.exports = validateHike;