const pool = require('../database/connect.js');

async function getAll() {
  const query = `SELECT * FROM products`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
}

async function getLatestID(){
    const query = `SELECT id FROM products ORDER BY id DESC LIMIT 1;`;
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Error querying user:', err);
      throw err;
    }
}

async function updateProduct(name, desc, id){
    const query = `UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *;`;

    const values = [name, desc, id];
    try{
      const result = await pool.query(query, values);
      
      console.log('Updated record:', result.rows[0]);

      return true;
    }catch(err){
      console.error('Error querying user:', err);
      throw err;
    }
}

async function createProduct(name, desc){
    const query = `INSERT INTO products (name, description) VALUES ($1,$2)`;
    const values = [name, desc];
    try{
      const result = await pool.query(query, values);

      console.log('created product', result.rows[0]);

      return true;
    }catch(err){
      console.error('Error querying user:', err);
      throw err;
    }
}

async function deleteProduct(id){
  const query = `DELETE FROM products where id = $1`;

  const values = [id];
  try{
    const result = await pool.query(query, values);

    return true;
  }catch(err){
    console.error('Error querying user:', err);
    throw err;
  }
}

async function filterProduct(text){
  const query = `SELECT * FROM products WHERE name LIKE $1 OR description LIKE $1`;

  const values = [`%${text}%`];

  try{
    const result = await pool.query(query, values);

    return result.rows;
  }catch(err){
    console.error('Error querying user:', err);
    throw err;
  }
}
module.exports = { getAll, getLatestID, updateProduct, createProduct, deleteProduct, filterProduct};