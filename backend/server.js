import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Assuming you have a DB connection file
import path from "path";
import productRoutes from "./routes/product.route.js";
import cors from "cors"; // Import the cors package

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// Enable CORS for all origins
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json()); // Allows parsing of JSON data in requests

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));

  app.get("*", (res, req) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server starts at http://localhost:" + PORT);
});
