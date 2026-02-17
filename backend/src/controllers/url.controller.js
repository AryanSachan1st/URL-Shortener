import { UrlSet } from "../models/urlSet.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js";

const getShortURL = asyncHandler(async (req, res) => {
    const { original_url } = req.body

    const base_url = `http://localhost:${process.env.PORT}`

    const url_set_exists = await UrlSet.findOne(
        {
            originalUrl: original_url
        }
    )

    let short_path = ""

    if (!url_set_exists) {
        const corpus = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let match = true

        while (match) {
            let temp_path = ""

            // creation
            for (let i=0; i<10; i++) {
                const index = Math.floor(Math.random() * corpus.length)
                temp_path += corpus[index]
            }

            // check
            const url_set = await UrlSet.findOne(
                {
                    shortPath: temp_path
                }
            )
            if (!url_set) {
                match = false
                short_path = temp_path
            }
        }

        const urlSet = await UrlSet.create(
            {
                originalUrl: original_url,
                shortPath: short_path
            }
        )
    } else {
        short_path = url_set_exists.shortPath
    }

    return res.status(201).json(
        new ApiResponse(201, {
            originalURL: original_url,
            shortURL: `${base_url}/${short_path}`
        }, "Short URL created")
    )
})

const redirectURL = asyncHandler(async (req, res) => {
    const { path } = req.params

    if (path.length < 10) {
        throw new ApiError(400, "Incorrect short URL path called")
    }

    const url_set = await UrlSet.findOne(
        {
            shortPath: path
        }
    )

    if (!url_set) {
        throw new ApiError(404, `No URL found linked to this: ${path} short path`)
    }

    let target_URL = url_set.originalUrl
    if (!target_URL.startsWith("https://") && !target_URL.startsWith("http://")) {
        target_URL = "https://" + target_URL
    }

    res.redirect(target_URL)
})

export { getShortURL, redirectURL }