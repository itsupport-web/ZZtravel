const express = require('express');
const router = express.Router();

const productController = require('../controller/productController.js');

router.post("/update", productController.updateProduct);

router.post("/getall", productController.getAll);

router.post("/setproductdetail", (req, res) => {
  const { id, name, desc } = req.body;
  req.session.product = { id, name, desc };
  req.session.productexist = true;
  res.send(true);
});

router.post("/getproductdetail", (req, res) => {
  let productdetails = req.session.product;
  let exist = req.session.productexist;
  req.session.product = null;
  req.session.productexist = false;
  res.send({productdetails, exist});
});

router.post("/create", productController.createProduct);

router.post("/getlatestproductid", productController.getLatestID);

module.exports = router;
