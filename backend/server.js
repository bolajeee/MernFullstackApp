import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Assuming you have a DB connection file
import productRoutes from "./routes/product.route.js";

const app = express();

dotenv.config();

app.use(express.json()); // Allows parsing of JSON data in requests

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server starts at http://localhost:5000");
});
