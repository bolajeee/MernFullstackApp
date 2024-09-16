// conventional method
// const express = require{'express'}
import express from "express";
import dotenv  from "dotenv";
import {connectDB} from "./config/db.js"


const app = express();

dotenv.config()

app.use(express.json()) // allows parcing of json files

app.post("/api/products", async (req, res) => {
 const Product = res.body // user sent data
 
    if (!Product.name || !Product.price || !Product.image) {
     return res.status(400).json({sucess:false, message: "Please provide all fields"})
    }
    
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({sucess:true, data:newProduct})
    } catch (error) {
        console.error("Error in creating product", error.message)
        res.status(500).json({success: false, message:"server error"})
    }
});

app.listen(5000, () => {
  connectDB()
  console.log("server starts at http://localhost:5000");
});
