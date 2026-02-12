const pool = require('../database/connect.js');

async function getAll() {
  const query = `SELECT * FROM customer`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
}

async function getLatestID(req,res){
  const query = `SELECT id FROM customer ORDER BY id DESC LIMIT 1;`;
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Error querying user:', err);
      throw err;
    }
}

async function loginUser(name, password){
    name = name.trim();
    password = password.trim();
    if(name == "" && password == ""){
        return false;
    }else{
        query = `SELECT * FROM users WHERE name = $1 AND password = $2`;
        values = [name, password];
        try {
            const result = await pool.query(query, values);
            if(result.rows.length > 0){
                return true;
            }else{
                return false;
            }
        } catch (err) {
            console.error('Error querying user:', err);
            throw err;
        }
    }
}

async function updateCustomer(id, name, email, number, ic){
    const query = `UPDATE customer SET name = $1, email = $2, contact_number = $3, ic = $4 WHERE id = $5 RETURNING *;`;

    const values = [name, email, number, ic, id];
    try{
      const result = await pool.query(query, values);
      
      console.log('Updated record:', result.rows[0]);

      return true;
    }catch(err){
      console.error('Error querying user:', err);
      throw err;
    }
}

async function createCustomer(name, email, number, ic){
    const query = `INSERT INTO customer (name, email, contact_number, ic) VALUES ($1,$2,$3,$4)`;
    const values = [name, email, number, ic];
    try{
      const result = await pool.query(query, values);

      console.log('created customer', result.rows[0]);

      return true;
    }catch(err){
      console.error('Error querying user:', err);
      throw err;
    }
}

async function deleteCustomer(id){
  const query = `DELETE FROM customer where id = $1`;

  const values = [id];
  try{
    const result = await pool.query(query, values);

    return true;
  }catch(err){
    console.error('Error querying user:', err);
    throw err;
  }
}

module.exports = { loginUser, getAll, updateCustomer, createCustomer, deleteCustomer, getLatestID};
