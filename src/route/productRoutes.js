const { Pool } = require("pg");
require("dotenv").config();
const express = require('express');
const router = express.Router();

router.post("/change", async(req,res)=>{
  try {
    const query = `UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *;`;

    const values = [req.body.name, req.body.desc, req.body.id];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  res.redirect('/products.html');
})

router.post("/add", async(req,res)=>{
  try {
    const query = `INSERT INTO products (name, description) VALUES ($1,$2)`;

    const values = [req.body.name, req.body.desc];

    const result = await pool.query(query, values);

    console.log('Updated record:', result.rows[0]);
  } catch (err) {
    console.error('Error updating record:', err);
  }
  res.redirect('/products.html');
})

router.post("/getoneproduct",async(req,res)=>{
  let row = await getLatestID();
  res.send(row);
})
