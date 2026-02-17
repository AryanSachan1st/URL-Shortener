import express from "express"

const app = express()
export { app }

// middlewares
app.use(express.urlencoded(
    {
        extended: true,
        limit: "16kb"
    }
))
app.use(express.json(
    {
        limit: "16kb"
    }
))
app.use(express.static("public"))

// routes
import healthCheckRouter from "./routes/healthcheck.routes.js"
app.use("/api-health", healthCheckRouter)

import urlRouter from "./routes/urlShorten.routes.js"
app.use("/", urlRouter)

// global error handler
app.use((err, req, res, next) => {
    // Default to 500 if undefined
    let code = err.statusCode || 500
    let message = err.message || "Internal Server Error"

    if (err.name === "CastError") {
        code = 400
        message = "Resource not found, Invalid id"
    } else if (err.code === 11000) {
        code = 409 // Conflict
        message = "Duplicate field value entered"
    } else if (err.name === "ValidationError") {
        code = 400
        message = Object.values(err.errors || {}).map((error) => error.message).join(", ")
    }

    return res.status(code).json(
        {
            success: false,
            statusCode: code,
            errorMessage: message,
            errors: err.errors || [], // all the errors
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined // detailed stack trace only in dev
        }
    )
})