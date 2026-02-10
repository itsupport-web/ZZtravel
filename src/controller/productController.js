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

module.exports = { getAll };