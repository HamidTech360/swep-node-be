const joi = require("joi");

exports.updateVp2BodySchema = joi
  .object()
  .keys({
    eye_test_result: joi.string(),
    ecg_test_result: joi.string(),
    urine_test_result: joi.string(),
    hermatology_test_result: joi.string()
  })