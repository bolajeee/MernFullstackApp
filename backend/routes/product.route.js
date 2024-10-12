import express from 'express'


import {
  createProduct,
  getAllProduct,
  updateProducts,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router()


router.get("/", getAllProduct);

router.post("/", createProduct);

router.put("/:id", updateProducts);

router.delete("/:id", deleteProduct);

export default router
