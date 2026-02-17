import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connect_instance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Connection name: ${connect_instance.connection.name}`)
        console.log(`Connection host: ${connect_instance.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export { connectDB }