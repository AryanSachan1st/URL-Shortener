import { app } from "./app.js"
import { connectDB } from "./db/index.js"
import dotenv from "dotenv"

dotenv.config(
    {
        path: "./.env"
    }
)

const PORT = process.env.PORT

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log(`Error in express application: ${error}`)
        throw error
    })
    const server = app.listen(PORT || 3000, () => {
        console.log(`Server is listening on: http://localhost:${PORT}`)
    })

    server.on("error", (error) => {
        console.log(`Error in server: ${error}`)
    process.exit(1)
    })
})
.catch((error) => {
    console.log(`Failed to start application: ${error}`)
    process.exit(1)
})