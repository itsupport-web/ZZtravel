const productService = require('../service/products.js');
const path = require('path');

async function getAll(req,res){
  try {
    const { username, password } = req.body;
    const user = await productService.getAll();

    if (!user) {
        return res.send(`
        <script>
            alert('error fetching data');
            window.location.href = '/public/signin/index.html';
        </script>
        `);
    }
    res.send(productService.getAll());
  } catch (err) {
    console.error('Error fetching record:', err);
  }
}
