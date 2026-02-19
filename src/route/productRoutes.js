const express = require('express');
const router = express.Router();

const productController = require('../controller/productController.js');

router.post("/update", productController.updateProduct);

router.post("/getall", productController.getAll);

router.post("/setproductdetail", productController.setProductDetail);

router.post("/getproductdetail", productController.getProductDetail);

router.post("/create", productController.createProduct);

router.post("/getlatestproductid", productController.getLatestID);

router.post("/deleteproduct", productController.deleteProduct);

router.post("/filterproduct", productController.filterProduct);

module.exports = router;