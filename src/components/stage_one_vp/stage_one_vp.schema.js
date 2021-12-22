const joi = require("joi");

exports.updateVp1BodySchema = joi
  .object()
  .keys({
    health_center_bio_data: joi.string(),
    clearance_certificate: joi.string(),
    passport: joi.string(),
  })