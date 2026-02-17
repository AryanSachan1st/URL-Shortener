import mongoose from "mongoose"

const connectDB = async () => {
    const connect_instance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`Connection name: ${connect_instance.connection.name}`)
    console.log(`Connection host: ${connect_instance.connection.host}`)
}

export { connectDB }