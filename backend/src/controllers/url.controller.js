import { UrlSet } from "../models/urlSet.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js";

const getShortURL = asyncHandler(async (req, res) => {
    const { original_url } = req.body

    const baseUrl = `http://localhost:${process.env.PORT}`

    // Check if URL already exists
    const existingUrlSet = await UrlSet.findOne({
        originalUrl: original_url
    })

    let shortPath = ""

    if (!existingUrlSet) {
        // Generate unique short path
        const corpus = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let isUnique = false

        while (!isUnique) {
            let tempPath = ""
            for (let i = 0; i < 10; i++) {
                const index = Math.floor(Math.random() * corpus.length)
                tempPath += corpus[index]
            }

            // Check if generated path exists
            const urlSet = await UrlSet.findOne({ shortPath: tempPath })
            if (!urlSet) {
                shortPath = tempPath
                isUnique = true
            }
        }

        await UrlSet.create({
            originalUrl: original_url,
            shortPath: shortPath
        })
    } else {
        shortPath = existingUrlSet.shortPath
    }

    return res.status(201).json(
        new ApiResponse(201, {
            originalURL: original_url,
            shortURL: `${baseUrl}/${shortPath}`
        }, "Short URL created")
    )
})

const redirectURL = asyncHandler(async (req, res) => {
    const { path } = req.params

    if (!path || path.length !== 10) {
        throw new ApiError(400, "Invalid short URL path")
    }

    const urlSet = await UrlSet.findOne({
        shortPath: path
    })

    if (!urlSet) {
        throw new ApiError(404, `No URL found linked to this: ${path} short path`)
    }

    let targetUrl = urlSet.originalUrl
    if (!targetUrl.startsWith("https://") && !targetUrl.startsWith("http://")) {
        targetUrl = "https://" + targetUrl
    }

    res.redirect(targetUrl)
})

export { getShortURL, redirectURL }