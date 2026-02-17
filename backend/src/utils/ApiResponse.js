class ApiResponse {
    constructor (
        statusCode,
        data = {},
        message,
        metadata = {}
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.metadata = metadata
        this.success = statusCode < 400
    }
}

export { ApiResponse }