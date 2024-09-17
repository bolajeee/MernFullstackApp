import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Assuming you have a DB connection file
import Product from "./models/product.model.js";// Make sure you import the Product model

const app = express();

dotenv.config();

app.use(express.json()); // Allows parsing of JSON data in requests

app.post("/api/products", async (req, res) => {
  const { name, price, image } = req.body; // Extract data from request body

  // Validate input
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Create new product instance
  const newProduct = new Product({ name, price, image });

  try {
    // Save new product to the database
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server starts at http://localhost:5000");
});
