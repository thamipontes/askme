/**
 * Enforces a standard for API responses
 * @param {boolean} success
 * @param {string} message
 * @param {object} data
 * @return {object} Structure containing the formatted response
 */
function apiResponse(success, message, data) {
  return {
    success,
    message,
    data,
  };
}

module.exports = apiResponse;
