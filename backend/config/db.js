import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose"; 

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process.exit code 1 means failure, while 0 means success
  }
};
