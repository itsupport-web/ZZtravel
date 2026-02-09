const express = require('express');
const router = express.Router();
require("dotenv").config();


const UserController = require('../controller/users.js');

router.post("/check",UserController.login)


































































router.post("/getcurrent", async (req,res)=>{
  if(req.session.isLoggedIn){
    let row = await getUser(req.session.user.username);
    console.log(req.session.user.username)
    if(row.length == 0){
      console.log("wrong")
      return res.send(`
        <script>
          alert('Error Fecthing data');
          window.location.href = '/signin.html';
        </script>
      `);
    }else{
      console.log("correct");
      res.send(row[0].password);
    }
  }
})

router.post("/update", async (req,res)=>{
  try {
    const query = `UPDATE users SET password = $1 WHERE name = $2 RETURNING *;`;

    const values = [req.body.password, req.session.user.username];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  
  res.redirect('/account/index');
})


router.get('/account/index', (req, res) => {
  if(req.session.isLoggedIn){
    console.log("sending file");
    res.sendFile(path.join(__dirname,"account","index.html"));
  }
});

router.get('/account/:file', ensureLoggedIn, (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(__dirname, 'account', file));
});

router.get('/public/:file', ensureLoggedIn, (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(__dirname, 'public', file));
});

router.get("/products",async (req,res)=>{
  let allproducts = await getProducts();
  res.send(allproducts);
})

router.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 

module.exports = router;