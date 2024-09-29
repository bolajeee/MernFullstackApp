import { mongoose } from "mongoose"

require("dotenv").config();

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch(error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) // process.exit code 1 means failure,while 0 means sucess
    }
}