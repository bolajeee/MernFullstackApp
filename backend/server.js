
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Assuming you have a DB connection file
import productRoutes from "./routes/product.route.js";
import cors from "cors"; // Import the cors package


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

app.use(express.json()); // Allows parsing of JSON data in requests

app.use("http://localhost:5000/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server starts at http://localhost:" + PORT);
});
