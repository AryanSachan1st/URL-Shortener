import mongoose from "mongoose"

const UrlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },
        shortPath: {
            type: String,
            required: true,
            unique: true
        }
    },
    {timestamps: true}
)

export const UrlSet = mongoose.model("UrlSet", UrlSchema)