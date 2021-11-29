/**
 *
 * @param {object} res - Response object from express middleware
 * @param {integer} statusCode - Status code for response
 * @param {string} message - message
 * @param {[object]} data - Data in response
 * @example responseHandler(res, 200, 'Project successful', { user: 'tobi })
 */
 module.exports = (res, statusCode, message, data = {}) => res.status(statusCode).send({
  status: 'success',
  message,
  data
});