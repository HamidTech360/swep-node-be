const joi = require('joi')
const { APIError } = require('../util/error_handler')

const validator = (schemas) => {
  return (req, res, next) => {
    const result = schemas.validate(req.body)
    if (result.error){
      return next(new APIError(400, result.error.details[0].message))
    }
    next()
  }
}

module.exports = validator