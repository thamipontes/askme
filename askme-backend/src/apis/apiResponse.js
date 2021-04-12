function ApiResponse(success, message, data) {
    return {
        success,
        message,
        data
    }
}

module.exports = ApiResponse;