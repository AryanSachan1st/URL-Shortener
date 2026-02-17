import { ApiResponse } from "..//utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"

const apiHealthCheck = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, {}, "URL shortener API is healthy and running")
    )
})

export { apiHealthCheck }