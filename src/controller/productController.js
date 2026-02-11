const productService = require('../service/products.js');
const path = require('path');

async function getAll(req,res){
  try {
    const products = await productService.getAll();

    if (!products) {
        return res.send(`
        <script>
            alert('error fetching data');
            window.location.href = '/public/signin/index.html';
        </script>
        `);
    }
    res.send(products);
  } catch (err) {
    console.error('Error fetching record:', err);
  }
}

async function getLatestID(req,res){
  try{
    const ID = await productService.getLatestID();

    if(!ID){
      return;
    }

    res.json(ID);
  }catch (err) {
    console.error('Error updating record:', err);
  }
}

async function updateProduct(req,res){
  try {
    const update = await productService.updateProduct(req.body.name, req.body.desc, req.body.id);

    if(!update){
      return;
    }

    res.redirect("/product");
  } catch (err) {
    console.error('Error updating record:', err);
  }
}

async function createProduct(req,res){
  try {
    const create = await productService.createProduct(req.body.name, req.body.desc);
    
    if(!create){
      return;
    }

    res.redirect("/product");
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

function setProductDetail(req, res){
  const { id, name, desc } = req.body;
  req.session.product = { id, name, desc };
  req.session.productexist = true;
  res.send(true);
}

function getProductDetail(req, res){
  let productdetails = req.session.product;
  let exist = req.session.productexist;
  req.session.product = null;
  req.session.productexist = false;
  res.send({productdetails, exist});
}

async function deleteProduct(req,res){
  try {
    const delete = await productService.deleteProduct(req.body.id);
    
    if(!delete){
      return;
    }

    res.send({ok : delete});
  } catch (err) {
    console.error('Error updating record:', err);
  };
}

module.exports = { getAll, updateProduct, getLatestID, createProduct, getProductDetail, setProductDetail, deleteProduct};