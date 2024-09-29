import express from 'express'


import {
  createProduct,
  getAllProduct,
  updateProducts,
  deletePrducts,
} from "../controller/product.controller.js";

const router = express.Router()


router.get("/", getAllProduct);

router.post("/", createProduct);

router.put("/:id", updateProducts);

router.delete("/:id", deletePrducts);

export default router
