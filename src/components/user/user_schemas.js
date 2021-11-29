const joi = require('joi')


exports.createUserBodySchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().required().min(6),
  matriculationNumber: joi.string(),
  registerationNumber: joi.string()
}).unknown(true)