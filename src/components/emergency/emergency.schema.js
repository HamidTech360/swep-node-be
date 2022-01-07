const joi = require("joi");

exports.emergencySchema = joi
  .object()
  .keys({
    issue: joi.string().required(),
    location: joi.string(),
    voice_note: joi.string()
  })