import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  const product = req.body;
  console.log(product)
  const newProduct = new Product(product)
  
  if (!newProduct.name || !newProduct.image || !newProduct.price) {
    return { success: false, message: "please fill in all required fields" };
  }

  try {
    await newProduct.save()
    res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    console.error("error in creating products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllProduct = async (req, res) => {
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
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "invalid id" });
  }

  try {
    const updateProducts = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProducts });
  } catch (error) {
    res.status(404).json({ success: false, message: "server error" });
  }
};

export const deletePrducts = async (req, res) => {
    const { id } = req.params;
    
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ success: false, message: "invalid id" });
    }
    
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(500).json({ success: flase, message: "server error" });
    console.log("error in deleting product", error.message);
  }
};