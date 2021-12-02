const joi = require("joi");

exports.createUserBodySchema = joi
  .object()
  .keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    password: joi.string().required().min(6),
    registrationNumber: joi.string().required(),
  })
  .unknown(true);

exports.authBodySchema = joi
  .object()
  .keys({
    password: joi.string().required().min(6),
    registrationNumber: joi.string().required(),
  })
  .unknown(true);
